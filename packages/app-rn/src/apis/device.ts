import BleManager from 'react-native-ble-manager';
import { eventBus } from '@race-lap/app-helper/dist/native';
import { type Device as DeviceType, EventName } from '@race-lap/app-helper';
import { Ble } from '@/constants';
// import * as crc32 from 'crc-32';

interface Record {
  /** 文件名称 */
  filename: string;
  /** 文件内容 crc32 */
  crc32: string;
  mycrc32: number;
  /** 文件内容 */
  content: string;
  count: number;
}

type CMDType =
  /** 文件列表 */
  | 'listdir'
  /** 删除文件 */
  | 'delfile'
  /** 关机 */
  | 'poweroff'
  /** 下载文件 */
  | 'downloadfile';

interface CMD {
  /** 指令类型 */
  cmd: CMDType;
  /** 指令参数 */
  params?: string;
}

export class Device {
  /** 单例 */
  private static instance: Device;
  /** 硬件 id */
  private static device: DeviceType | null = null;
  /** 前置任务执行链 */
  private static taskChain = Promise.resolve<unknown>(null);
  /** 获取记录（文件）列表任务执行链 */
  private static getRecordListTaskChain = Promise.resolve<string[]>([]);
  /** 删除记录（文件）任务执行链 */
  private static delRecordTaskChain = Promise.resolve();
  /** 获取记录（文件）内容任务执行链 */
  private static getRecordContentTaskChain = Promise.resolve<Record | null>(
    null,
  );

  /** 获取单例 */
  static getInstance() {
    Device.instance = Device.instance || new Device();
    return Device.instance;
  }

  /**
   * 当前连接的设备id
   */
  get id() {
    return Device.device?.id;
  }

  private constructor() {
    eventBus.on(EventName.BLE_DEVICE_CONNECTED, this.deviceConnectedHandle);
  }

  /** 发送指令 */
  private sendCmd(cmd: CMD) {
    if (!Device.device) {
      throw new Error('no connected ble device found !');
    }
    return BleManager.write(
      Device.device.id,
      Ble.SERVICE_UUID,
      Ble.CHARACTERISTIC_CMD,
      require('convert-string').stringToBytes(JSON.stringify(cmd)),
      512,
    );
  }

  /** 发送指令 */
  private sendDownloadRes(line: number) {
    if (!Device.device) {
      throw new Error('no connected ble device found !');
    }
    return BleManager.write(
      Device.device.id,
      Ble.SERVICE_UUID,
      Ble.CHARACTERISTIC_DOWNLOAD_FILE,
      require('convert-string').stringToBytes(String(line)),
      512,
    );
  }

  /**
   * 新设备连接事件处理函数
   * @param device 新设备
   */
  private deviceConnectedHandle(device: DeviceType) {
    const prevDevice = Device.device;
    Device.device = device;
    if (prevDevice) {
      Device.taskChain = Device.taskChain
        .then(() => {
          [
            Ble.CHARACTERISTIC_CMD,
            Ble.CHARACTERISTIC_LIST_DIR,
            Ble.CHARACTERISTIC_DOWNLOAD_FILE,
          ].map(characteristicUUID =>
            BleManager.stopNotification(
              prevDevice.id,
              Ble.SERVICE_UUID,
              characteristicUUID,
            ),
          );
        })
        .catch(err => {
          console.error('stopNotification failed');
          console.error(err);
        });
    }
    Device.taskChain = Device.taskChain
      .then(() => BleManager.retrieveServices(device.id, [Ble.SERVICE_UUID]))
      .then(() =>
        Promise.all(
          [
            Ble.CHARACTERISTIC_CMD,
            Ble.CHARACTERISTIC_LIST_DIR,
            Ble.CHARACTERISTIC_DOWNLOAD_FILE,
          ].map(characteristicUUID =>
            BleManager.startNotification(
              device.id,
              Ble.SERVICE_UUID,
              characteristicUUID,
            ),
          ),
        ),
      )
      .then(() => eventBus.emit(EventName.BLE_DEVICE_READY))
      .catch(err => {
        console.error('init new ble failed !');
        console.error(err);
      });
  }

  /**
   * 获取记录列表
   */
  getRecordList() {
    Device.getRecordListTaskChain = new Promise<string[]>((resolve, reject) => {
      const listDirResult: string[] = [];
      const getRecordListTaskChain = Device.getRecordListTaskChain;
      Device.taskChain
        .then(() => getRecordListTaskChain)
        .then(() => {
          if (!Device.device) {
            throw new Error('no connected ble device found !');
          }
          const bleListDirHandle = (chunk: string) => {
            if (/files:\d+/.test(chunk)) {
              eventBus.off(EventName.BLE_LIST_DIR, bleListDirHandle);
              resolve(listDirResult);
            } else {
              listDirResult.push(chunk);
            }
          };
          eventBus.on(EventName.BLE_LIST_DIR, bleListDirHandle);
        })
        .then(() => this.sendCmd({ cmd: 'listdir' }))
        .catch(reject);
    });
    return Device.getRecordListTaskChain;
  }

  /**
   * 获取记录
   * @param path 记录路径
   */
  getRecord(path: string) {
    Device.getRecordContentTaskChain = new Promise<Record>(
      (resolve, reject) => {
        let lineCount = 0;
        const record: Record = {
          content: '',
          filename: '',
          crc32: '',
          mycrc32: 0,
          count: 0,
        };
        const getRecordContentTaskChain = Device.getRecordContentTaskChain;
        Device.taskChain
          .then(() => getRecordContentTaskChain)
          .then(() => {
            const eventHandle = (chunk: string) => {
              // console.log(chunk);
              // downloadfile:/XLAPDATA/xlap20221130073930.txt:crc32:1433351588
              if (chunk.startsWith('downloadfile:')) {
                eventBus.off(EventName.BLE_DOWNLOAD_FILE, eventHandle);
                const match = chunk.match(/^downloadfile:[^:]+:crc32:(\w+)/);
                if (match) {
                  record.crc32 = match[1];
                  record.filename = path.split('/').pop()!;
                  // record.mycrc32 = record.mycrc32 >>> 0;
                  resolve(record);
                } else {
                  reject(new Error('invalid end line !'));
                }
              } else {
                record.count++;
                record.content += chunk;
                this.sendDownloadRes(lineCount++);
                // record.mycrc32 = crc32.str(chunk, record.mycrc32);
              }
            };
            eventBus.on(EventName.BLE_DOWNLOAD_FILE, eventHandle);
          })
          .then(() => this.sendCmd({ cmd: 'downloadfile', params: path }))
          .catch(reject);
      },
    );
    return Device.getRecordContentTaskChain;
  }

  /**
   * 删除记录
   * @param path 文件路径
   */
  delRecord(path: string) {
    Device.delRecordTaskChain = new Promise((resolve, reject) => {
      const delRecordTaskChain = Device.delRecordTaskChain;
      Device.taskChain
        .then(() => delRecordTaskChain)
        .then(() => {
          const eventHandle = (chunk: string) => {
            // delfile:/XLAPDATA/SA20220612091229.sa:ok
            const match = chunk.match(/^delfile:[^:]+:(\w+)/);
            if (match) {
              const status = match[1];
              if (status === 'ok') {
                resolve();
              } else {
                reject(new Error(`File: ${path} del failed: ${status}`));
              }
            } else {
              reject(new Error('invalid response !'));
            }
          };
          eventBus.on(EventName.BLE_DEL_FILE, eventHandle);
        })
        .then(() => this.sendCmd({ cmd: 'delfile', params: path }))
        .catch(reject);
    });
    return Device.delRecordTaskChain;
  }
}

export default Device.getInstance();
