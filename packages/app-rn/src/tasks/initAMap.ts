import { Platform } from 'react-native';
import { AMapSdk } from 'react-native-amap3d';
import { AMapKey } from '@/constants';

/**
 * 初始化 AMap
 */
export function initAMap() {
  AMapSdk.init(
    Platform.select({
      android: '',
      ios: AMapKey.IOS,
    }),
  );
}

export default initAMap;
