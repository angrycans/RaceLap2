import dayjs from 'dayjs';
import type { RecordMeta, RecordDataOverview } from '../types';
import { parseLap } from './recordData/parseLap';

const metaShortKeyMap = {
  V: 'version',
  D: 'startDate',
  U: 'userId',
  N: 'username',
  M: 'carrierName',
  H: 'hardwareVersion',
  B: 'firmwareVersion',
  T: 'racetrackName',
} as const;

/**
 * 解析文件内容头信息
 * @param content 对应记录文件内容
 */
export function parseMeta(content: string): RecordMeta {
  return Array.from(content.matchAll(/#([^=#]+)=([^=]+)=/g)).reduce((acc, [, sKey, value]) => {
    const key = metaShortKeyMap[sKey.trim() as keyof typeof metaShortKeyMap];
    if (key) {
      acc[metaShortKeyMap[sKey.trim() as keyof typeof metaShortKeyMap]] = value.trim();
    }
    return acc;
  }, {} as RecordMeta);
}

interface RaceCycle {
  /** 当前碰撞点下标 */
  idx: number;
  /** 当前碰撞点经纬度 [经度，纬度] */
  intersectP: [number, number]
  /** 最大速度 */
  maxspeed: number;
  /** 上一个碰撞点下标 */
  prv: number;
  /** 圈时 */
  timer: number;
}

interface RecordDataInfo extends RecordDataOverview {
  /** 圈信息 */
  cycles: RaceCycle[],
  /** 点信息 */
  data: [number, ...string[]][],
}

/**
 * 解析文件数据
 * @param content 对应记录文件内容
 */
export function parseData(content: string): RecordDataInfo {
  const pointContentText = content.match(/<point>([^<]+)<\/point>/)?.[1] || '';
  const data = pointContentText
    .split(';')
    .map(chunk => {
      chunk = chunk.trim();
      if (chunk) {
        const chunkItemList = chunk.split(',') as [number, ...string[]];
        const rawTime = chunkItemList[0];
        chunkItemList[0] = +dayjs(chunkItemList[0], 'YYYYMMDDHHmmssSSS', true)
        chunkItemList.push(rawTime)
        return chunkItemList
      }
    }).filter(Boolean) as [number, ...string[]][];

  const tracksectorContentText = content.match(/<tracksector>([^<]+)<\/tracksector>/)?.[1] || '';
  // parseLap 经纬度 反了
  const [lat1, lng1, lat2, lng2] = tracksectorContentText.split(';').map(chunk => chunk.trim()).filter(Boolean)?.[0].split(',');
  const cycleInfoList: RaceCycle[] = parseLap(data, { lng1, lat1, lng2, lat2 });
  // 修复 经纬度 顺序
  cycleInfoList.forEach(cycle => cycle.intersectP.reverse())
  const totalTime = +dayjs(data[data.length - 1][0] - data[0][0]);
  const maxSpeed = Math.max(...cycleInfoList.map(cycle => cycle.maxspeed));
  const minCycleTime = +dayjs(Math.min(...cycleInfoList.map(cycle => cycle.timer)));
  const cycleNum = cycleInfoList.length;
  const avgSpeed = cycleNum ? cycleInfoList.reduce((acc, cycle) => acc + cycle.maxspeed, 0) / cycleNum : 0;
  const avgCycleTime = cycleNum ? +dayjs(cycleInfoList.reduce((acc, cycle) => acc + cycle.timer, 0) / cycleNum) : 0;

  return {
    totalTime,
    minCycleTime,
    maxSpeed: String(maxSpeed),
    avgSpeed: String(avgSpeed),
    avgCycleTime,
    cycleNum,
    cycles: cycleInfoList,
    data
  }
}
