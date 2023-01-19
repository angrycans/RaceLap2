import { Linking } from 'react-native';
import { FileSystem } from 'react-native-file-access';
import { saveFile } from '@/utils';
import { initDBTask } from '@/tasks';
import * as crc32 from 'crc-32';

interface InitLinkingOptions {
  /**
   * 跳转详情页
   * @param id 详情页id
   */
  navigateToDetail?(id: number): void;
}

export function initLinking(opts: InitLinkingOptions) {
  const eventHandle = async (param: { url: string } | string | null) => {
    const url = typeof param === 'string' ? param : param?.url;
    const urlInfo = parseLinkingFileUrl(url);
    if (urlInfo) {
      await initDBTask;
      const content = await FileSystem.readFile(urlInfo.remoteUrl);
      const recordId = await saveFile({
        content,
        crc32: crc32.str(content) >>> 0,
        fileExt: urlInfo.ext,
      });
      if (typeof recordId === 'number') {
        opts.navigateToDetail?.(recordId);
      }
    }
  };

  Linking.getInitialURL().then(eventHandle);
  const subscription = Linking.addEventListener('url', eventHandle);
  return () => {
    subscription.remove();
  };
}

const supportFileTypeList = ['sa', 'xld'];

export function parseLinkingFileUrl(url?: string | null) {
  if (
    !url ||
    typeof url !== 'string' ||
    !['file:', 'content:'].some(protocol => url.startsWith(`${protocol}//`)) ||
    !supportFileTypeList.some(type => url.endsWith(`.${type}`))
  ) {
    return null;
  }

  const matches = url.match(
    /^(file:|content:)\/\/([\s\S]+?\/(([^/]+?)\.([^.]+)))$/,
  );

  if (!matches) {
    return null;
  }

  const [remoteUrl, protocol, filePath, filename, baseFilename, ext] = matches;

  return {
    protocol,
    remoteUrl,
    filePath,
    filename,
    baseFilename,
    ext,
  };
}

export default initLinking;
