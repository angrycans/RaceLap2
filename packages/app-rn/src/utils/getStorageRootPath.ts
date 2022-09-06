import { Platform } from 'react-native';
import RNFS from 'react-native-fs';

/**
 * 获取存储根目录
 */
export function getStorageRootPath() {
  return Platform.select({
    ios: RNFS.CachesDirectoryPath,
    android: RNFS.CachesDirectoryPath,
  })!;
}

export default getStorageRootPath;
