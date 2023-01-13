import { type Device, EventName } from '@race-lap/app-helper';
import { eventBus } from '@race-lap/app-helper/dist/native';
import BleManager from 'react-native-ble-manager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorageKey, Ble } from '@/constants';
import { device } from '@/apis';
// import * as crc32 from 'crc-32';
// import { initDBTask } from './initDB';
import { NativeModules, NativeEventEmitter } from 'react-native';
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

let retryTimeoutId: NodeJS.Timeout;
let needRetry = false;

/**
 * 自动尝试重新连接
 * @returns 取消订阅
 */
function reconnectAutoRetry() {
  needRetry = true;
  clearTimeout(retryTimeoutId);
  retryTimeoutId = setTimeout(async () => {
    const bleDeviceId = await AsyncStorage.getItem(
      AsyncStorageKey.LAST_CONNECTED_BLE_DEVICE_ID,
    );
    if (bleDeviceId) {
      const connectSuccess = await BleManager.connect(bleDeviceId)
        .then(() => BleManager.getConnectedPeripherals([Ble.SERVICE_UUID]))
        .then(devices => {
          const targetDevice: Device | undefined = devices.find(
            d => d.id === bleDeviceId,
          );
          if (!targetDevice) {
            return false;
          }
          targetDevice.connected = true;
          eventBus.emit(EventName.BLE_DEVICE_CONNECTED, targetDevice);
          return true;
        })
        .catch(() => false);
      if (!connectSuccess && needRetry) {
        reconnectAutoRetry();
      }
    }
  }, 1 * 1000);
  return () => {
    needRetry = false;
    clearTimeout(retryTimeoutId);
  };
}

/**
 * 初始化蓝牙
 */
export function initBle() {
  const reconnectAutoRetryUnsubscribe = reconnectAutoRetry();
  BleManager.start({ showAlert: true });
  const disconnectSubscription = bleManagerEmitter.addListener(
    'BleManagerDisconnectPeripheral',
    () => {
      reconnectAutoRetry();
    },
  );
  const didUpdateValueSubscription = bleManagerEmitter.addListener(
    'BleManagerDidUpdateValueForCharacteristic',
    data => {
      if (device.id && data.peripheral === device.id) {
        const msgChunk: string = require('convert-string').UTF8.bytesToString(
          data.value,
        );
        // console.log('msg-characteristic', data.characteristic);
        // console.log('msg-chunk', msgChunk);
        // console.log('msg-data.value', data.value);

        switch (data.characteristic) {
          case Ble.CHARACTERISTIC_CMD:
            if (msgChunk.startsWith('delfile:')) {
              eventBus.emit(EventName.BLE_DEL_FILE, msgChunk);
            }
            break;
          case Ble.CHARACTERISTIC_LIST_DIR:
            eventBus.emit(EventName.BLE_LIST_DIR, msgChunk);
            break;
          case Ble.CHARACTERISTIC_DOWNLOAD_FILE:
            eventBus.emit(EventName.BLE_DOWNLOAD_FILE, msgChunk);
            break;
          default:
            break;
        }
      }
    },
  );
  const bleDeviceReadyHandle = async () => {
    // const recordList = await device.getRecordList();
    // console.log(recordList[1]);
    const record = await device.getRecord('/XLAPDATA/20230110101335.xld'); // '/XLAPDATA/20230110101335.xld'
    // const record = await device.getRecord('/XLAPDATA/20230110103252.xld');
    // const mycrc32 = crc32.str(record!.content);
    console.log('record ==>', record);
    // await device.delRecord(recordList[0]);
    // console.log('del success');
  };
  eventBus.on(EventName.BLE_DEVICE_READY, bleDeviceReadyHandle);
  return () => {
    eventBus.off(EventName.BLE_DEVICE_READY, bleDeviceReadyHandle);
    reconnectAutoRetryUnsubscribe();
    disconnectSubscription.remove();
    didUpdateValueSubscription.remove();
  };
}
