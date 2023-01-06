import { type Device, EventName } from '@race-lap/app-helper';
import { eventBus } from '@race-lap/app-helper/dist/native';
import BleManager from 'react-native-ble-manager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorageKey, BLE_SERVICE_UUID } from '@/constants';
import { initDBTask } from './initDB';
import { NativeModules, NativeEventEmitter } from 'react-native';
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const eventHandle = async (device: Device) => {
  await initDBTask;
  console.log('device --->', device);
  // TODO: 同步文件
};

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
        .then(() => BleManager.getConnectedPeripherals([BLE_SERVICE_UUID]))
        .then(devices => {
          const targetDevice: Device | undefined = devices.find(
            device => device.id === bleDeviceId,
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

export function initBle() {
  const reconnectAutoRetryUnsubscribe = reconnectAutoRetry();
  BleManager.start({ showAlert: true });
  eventBus.on(EventName.BLE_DEVICE_CONNECTED, eventHandle);
  const subscription = bleManagerEmitter.addListener(
    'BleManagerDisconnectPeripheral',
    reconnectAutoRetry,
  );
  return () => {
    eventBus.off(EventName.BLE_DEVICE_CONNECTED, eventHandle);
    reconnectAutoRetryUnsubscribe();
    subscription.remove();
  };
}
