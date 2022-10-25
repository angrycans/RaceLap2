import { Platform, PermissionsAndroid } from 'react-native';
import { eventBus } from '@race-lap/app-helper/dist/native';
import { EventName } from '@race-lap/app-helper';

/** 通用权限请求任务 */
export const commonPermissionsRequestReady = new Promise<void>(r => {
  const handle = () => {
    eventBus.off(EventName.COMMON_PERMISSIONS_REQUEST_READY, handle);
    r();
  };
  eventBus.on(EventName.COMMON_PERMISSIONS_REQUEST_READY, handle);
});

/**
 * 请求通用权限
 */
export async function requestCommonPermissions() {
  if (Platform.OS === 'android') {
    const permissionMap = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    ]);

    if (
      Object.values(permissionMap).some(permission => permission !== 'granted')
    ) {
      return Promise.reject('Request Read/Write Permission Failed !');
    }
  }

  eventBus.emit(EventName.COMMON_PERMISSIONS_REQUEST_READY);
}

export default requestCommonPermissions;
