import dayjs from 'dayjs';
import { FileSystem } from 'react-native-file-access';
import { utils } from '@race-lap/app-helper';
import { apis } from '@race-lap/app-helper/dist/native';

interface Options {
  /** 文件内容 */
  content: string;
  /** 文件 crc32 值 */
  crc32: number;
  /** 文件后缀名 */
  fileExt: string;
}

/**
 * 保存文件至应用内
 * @param opts 配置项
 */
export async function saveFile(opts: Options) {
  const { content, crc32, fileExt } = await opts;
  const recordListRes = await apis.record.getList({ crc32 });
  const localRecord = recordListRes.data?.[0];
  if (localRecord) {
    return localRecord.id;
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
  const filename = `${crc32}${fileExt ? `.${fileExt}` : ''}`;
  await FileSystem.writeFile(`${recordRoot}/${filename}`, content);
  const { errCode, errMsg, data } = await apis.record.save({
    ...recordMeta,
    totalTime,
    minCycleTime,
    maxSpeed,
    avgSpeed,
    avgCycleTime,
    cycleNum,
    crc32,
    fileId: filename,
    racetrackId,
    startDate: +dayjs(startDate, 'MM-DD-YYYY HH:mm:ss'),
  });
  if (errCode) {
    throw new Error(errMsg);
  }
  return data;
}

export default saveFile;
