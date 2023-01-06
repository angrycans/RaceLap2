import { useEffect, useMemo, useState } from 'react';
import { EventName, type Device } from '@race-lap/app-helper';
import { eventBus } from '@race-lap/app-helper/dist/native';
import { NativeModules, NativeEventEmitter } from 'react-native';
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

interface DeviceInfo extends Device {
  /** 电池电量 */
  battery: number;
  /** gps 信号 */
  gps: number;
  /** 赛道 id */
  racetrackId: number;
}

/**
 * 获取当前设备信息
 */
export function useDeviceInfo() {
  const [device, setDevice] = useState<Device | null>(null);

  useEffect(() => {
    const bleDeviceConnectedHandle = (newConnectedDevice: Device) => {
      newConnectedDevice && setDevice(newConnectedDevice);
    };
    eventBus.on(EventName.BLE_DEVICE_CONNECTED, bleDeviceConnectedHandle);
    const disconnectedSubscription = bleManagerEmitter.addListener(
      'BleManagerDisconnectPeripheral',
      () => {
        // TODO: 增加定时器监听硬件状态
        setDevice(null);
      },
    );
    return () => {
      disconnectedSubscription.remove();
      eventBus.off(EventName.BLE_DEVICE_CONNECTED, bleDeviceConnectedHandle);
    };
  }, []);

  return useMemo<DeviceInfo | null>(() => {
    return device ? { ...device, battery: 1, gps: 0.9, racetrackId: 1 } : null;
  }, [device]);
}

export default useDeviceInfo;
