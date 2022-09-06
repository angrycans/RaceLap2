import { useMemo } from 'react';
import { useCurrentWifiName } from './useCurrentWifiName';
import { DEVICE_PREFIX } from '@/constants';

interface DeviceInfo {
  /** 设备名称 */
  name: string;
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
  const currentWifiName = useCurrentWifiName();
  return useMemo<DeviceInfo | null>(() => {
    const name = currentWifiName.startsWith(DEVICE_PREFIX)
      ? currentWifiName
      : '';
    return !name ? { name: 'RaceLaper-13u49af1', battery: 1, gps: 0.9, racetrackId: 1 } : null;
  }, [currentWifiName]);
}

export default useDeviceInfo;
