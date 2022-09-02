import { github } from '@/apis';
import { unzip } from 'react-native-zip-archive';
import RNFS from 'react-native-fs';

/**
 * 同步 web.bundle
 */
export async function syncWebBundle() {
  const release = await github.getLatestRelease();
  const webBundleRemoteInfo = release.assets.find(item =>
    item.name.startsWith('web.bundle'),
  );
  if (webBundleRemoteInfo) {
    const webBundleDownloadUrl = webBundleRemoteInfo.browser_download_url;
    const webBundlePath = `${RNFS.DocumentDirectoryPath}/web.bundle`;
    const webBundleCachePath = `${RNFS.DocumentDirectoryPath}/caches`;
    const cachedWebBundlePath = `${webBundleCachePath}/${webBundleRemoteInfo.name.replace(
      /_/g,
      '',
    )}-web.bundle.zip`;
    let needDownload = true;

    if (await RNFS.exists(cachedWebBundlePath)) {
      // TODO: MD5 如何计算
      // const res = await fetch(webBundleDownloadUrl);
      // console.log(webBundleDownloadUrl, res.headers.get('content-md5'));

      // 临时使用文件大小比较
      const { size } = await RNFS.stat(cachedWebBundlePath);
      needDownload = webBundleRemoteInfo.size !== size;
    }

    if (needDownload) {
      if (!(await RNFS.exists(webBundleCachePath))) {
        await RNFS.mkdir(webBundleCachePath);
      }
      await RNFS.downloadFile({
        fromUrl: webBundleDownloadUrl,
        toFile: cachedWebBundlePath,
      }).promise;

      if (await RNFS.exists(webBundlePath)) {
        await RNFS.unlink(webBundlePath);
      }

      await unzip(cachedWebBundlePath, RNFS.DocumentDirectoryPath);
    }
  }
}
