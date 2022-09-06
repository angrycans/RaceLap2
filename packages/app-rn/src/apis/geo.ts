import { PermissionsAndroid } from 'react-native';
import { init, Geolocation, Position } from 'react-native-amap-geolocation';
import { AMapKey } from '@/constants';

const preTask = PermissionsAndroid.requestMultiple([
  PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
]).then(() =>
  init({
    ios: AMapKey.IOS,
    android: '',
  }),
);

export async function getCurrentPosition() {
  return preTask.then(
    () =>
      new Promise<Position>((resolve, reject) =>
        Geolocation.getCurrentPosition(resolve, reject),
      ),
  );
}
