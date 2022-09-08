import { Platform, Linking } from 'react-native';
import RNFS from 'react-native-fs';
import dayjs from 'dayjs';
import { utils } from '@race-lap/app-helper';
import { apis } from '@race-lap/app-helper/dist/native';

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
      const [content, fileHash, { size }] = await Promise.all([
        RNFS.readFile(urlInfo.filePath),
        RNFS.hash(urlInfo.filePath, 'md5'),
        RNFS.stat(urlInfo.filePath),
      ]);

      const recordListRes = await apis.record.getList({ fileHash });
      const localRecord = recordListRes.data?.[0];
      if (localRecord) {
        opts.navigateToDetail?.(localRecord.id);
        // 重复导入
        return;
      }

      const { startDate, ...recordMeta } = utils.record.parseMeta(content);
      const [racetrackId, { recordRoot }] = await Promise.all([
        apis.racetrack
          .getList({ name: recordMeta.racetrackName })
          .then(res => res?.data?.[0]?.id),
        // TODO 查询载具
        apis.path.getInfo().then(res => res.data!),
      ]);

      const {
        totalTime,
        minCycleTime,
        maxSpeed,
        avgSpeed,
        avgCycleTime,
        cycleNum,
      } = utils.record.parseData(content);

      await RNFS.copyFile(
        urlInfo.filePath,
        `${recordRoot}/${urlInfo.filename}`,
      );

      const { errCode, data } = await apis.record.save({
        ...recordMeta,
        totalTime,
        minCycleTime,
        maxSpeed,
        avgSpeed,
        avgCycleTime,
        cycleNum,
        fileHash,
        fileSize: size,
        fileId: urlInfo.filename,
        racetrackId,
        startDate: +dayjs(startDate, 'MM-DD-YYYY HH:mm:ss'),
      });

      if (!errCode) {
        opts.navigateToDetail?.(data);
      }
    }
  };

  if (Platform.OS === 'ios') {
    Linking.getInitialURL().then(eventHandle);
    const subscription = Linking.addEventListener('url', eventHandle);
    return () => {
      subscription.remove();
    };
  } else {
    return () => {
      // TODO: android
    };
  }
}

const supportFileTypeList = ['sa', 'xld'];

export function parseLinkingFileUrl(url?: string | null) {
  if (
    !url ||
    typeof url !== 'string' ||
    !url.startsWith('file://') ||
    !supportFileTypeList.some(type => url.endsWith(`.${type}`))
  ) {
    return null;
  }

  const matches = decodeURI(url).match(
    /file:\/\/([\s\S]+?\/(([^/]+?)\.([^.]+)))$/,
  );

  if (!matches) {
    return null;
  }

  const [remoteUrl, filePath, filename, baseFilename, ext] = matches;

  return {
    remoteUrl,
    filePath,
    filename,
    baseFilename,
    ext,
  };
}

export default initLinking;
