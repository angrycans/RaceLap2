import { unzip } from 'react-native-zip-archive';
import { Dirs, FileSystem } from 'react-native-file-access';
import { apis } from '@race-lap/app-helper/dist/native';
import { appcenter } from '@/apis';

/**
 * 同步 web.bundle
 */
export async function syncWebBundle() {
  const storageRootPath = (await apis.path.getInfo()).data?.root;
  if (!storageRootPath) {
    return;
  }

  try {
    const webBundleUnzipPath = `${storageRootPath}/web.bundle`;
    const cachedWebBundleZipPath = `${Dirs.CacheDir}/web.bundle.zip`;
    const release = await appcenter.getLatestRelease();
    if (release.fingerprint) {
      const isCacheExist = await FileSystem.exists(cachedWebBundleZipPath);
      const needDownload =
        !isCacheExist ||
        (await FileSystem.hash(cachedWebBundleZipPath, 'MD5')) !==
          release.fingerprint;

      if (needDownload) {
        if (isCacheExist) {
          await FileSystem.unlink(cachedWebBundleZipPath);
        }

        await FileSystem.fetchManaged(release.download_url, {
          path: cachedWebBundleZipPath,
        }).result;

        if (await FileSystem.exists(webBundleUnzipPath)) {
          await FileSystem.unlink(webBundleUnzipPath);
        }

        await unzip(cachedWebBundleZipPath, webBundleUnzipPath);
      }
    } else {
      throw new Error('Remote Web Bundle Not Exist !');
    }
  } catch (err) {
    console.error(err);
    if (!(await FileSystem.exists(`${Dirs.DocumentDir}/web.bundle`))) {
      await FileSystem.cpAsset(
        'web.bundle.zip',
        `${Dirs.CacheDir}/web.bundle.zip`,
      );
      await unzip(
        `${Dirs.CacheDir}/web.bundle.zip`,
        `${Dirs.DocumentDir}/web.bundle`,
      );
    }
  }
}
