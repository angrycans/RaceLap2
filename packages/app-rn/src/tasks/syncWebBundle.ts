import AsyncStorage from '@react-native-async-storage/async-storage';
import { unzip } from 'react-native-zip-archive';
import RNFS from 'react-native-fs';
import { github } from '@/apis';
import { AsyncStorageKey } from '@/constants';
import { getStorageRootPath } from '@/utils';

const storageRootPath = getStorageRootPath();

/**
 * 同步 web.bundle
 */
export async function syncWebBundle() {
  const webBundlePath = `${storageRootPath}/web.bundle`;
  try {
    const [release, checkContent] = await Promise.all([
      github.getLatestRelease(),
      AsyncStorage.getItem(AsyncStorageKey.WEB_BUNDLE_CHECK_CONTENT),
    ]);
    const webBundleRemoteInfo = release.assets.find(item =>
      item.name.startsWith('web.bundle'),
    );

    if (webBundleRemoteInfo) {
      const webBundleDownloadUrl = webBundleRemoteInfo.browser_download_url;
      const webBundleZipPath = `${RNFS.TemporaryDirectoryPath}/${webBundleRemoteInfo.name}`;

      // TODO: MD5 如何计算
      // const res = await fetch(webBundleDownloadUrl);
      // console.log(webBundleDownloadUrl, res.headers.get('content-md5'));

      // TODO: 远程检查内容，后期替换为 MD5
      const remoteCheckContent = String(webBundleRemoteInfo.size);
      const needDownload = checkContent !== remoteCheckContent;

      if (needDownload) {
        await RNFS.downloadFile({
          fromUrl: webBundleDownloadUrl,
          toFile: webBundleZipPath,
        }).promise;

        if (await RNFS.exists(webBundlePath)) {
          await RNFS.unlink(webBundlePath);
        }

        await unzip(webBundleZipPath, storageRootPath);
        AsyncStorage.setItem(
          AsyncStorageKey.WEB_BUNDLE_CHECK_CONTENT,
          remoteCheckContent,
        );
      }
    } else {
      throw new Error('Remote Web Bundle Not Exist !');
    }
  } catch (err) {
    console.error(err);
    if (!(await RNFS.exists(webBundlePath))) {
      await RNFS.copyFile(`${RNFS.MainBundlePath}/web.bundle`, webBundlePath);
    }
  }
}
