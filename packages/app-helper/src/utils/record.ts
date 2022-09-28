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
  // sa
  DID: 'userId',
  SW: 'hardwareVersion',
  S: 'racetrackName',
  FMV: 'firmwareVersion'
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

export interface RecordDataInfo extends RecordDataOverview {
  /** 圈信息 */
  cycles: RaceCycle[],
  /** 点信息 */
  data: [number, ...string[]][],
  /** 赛道信息 */
  racetracks: [number, number, number, number][],
}

/**
 * 解析文件数据
 * @param content 对应记录文件内容
 */
export function parseData(content: string): RecordDataInfo {
  let startDate = dayjs(content.match(/#D=([^=]+)=/)?.[1], 'MM-DD-YYYY HH:mm:ss');
  // xld: <point>...<\/point>; sa: <trace #pt=6207>...</trace>
  const pointContentText = (content.match(/<point>([^<]+)<\/point>/) || content.match(/<trace[^>]*>([^<]+)<\/trace>/))?.[1] || '';
  const data = pointContentText
    .replaceAll(/[\r\n]+/g, ';')
    .split(';')
    .map(chunk => {
      chunk = chunk.trim();
      if (chunk) {
        const chunkItemList = chunk.split(',') as [number, ...string[]];
        // xld col: 12; sa col: 11
        if (chunkItemList.length < 12) {
          // sa
          chunkItemList.unshift(+startDate);
          startDate = startDate.add(100, 'ms');
        } else {
          // xld
          chunkItemList[0] = +dayjs(chunkItemList[0], 'YYYYMMDDHHmmssSSS', true);
        }
        return chunkItemList
      }
    }).filter(Boolean) as [number, ...string[]][];
  const racetracks = parseRacetrackData(content);
  // parseLap 经纬度 反了
  const [lat1, lng1, lat2, lng2] = racetracks?.[racetracks.length - 1];
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
    maxSpeed: String(+maxSpeed.toFixed(2)),
    avgSpeed: String(+avgSpeed.toFixed(2)),
    avgCycleTime,
    cycleNum,
    cycles: cycleInfoList,
    racetracks,
    data
  }
}

/**
 * 解析赛道信息
 * @param content
 */
export function parseRacetrackData(content: string) {
  // xld: <tracksector>...<\/tracksector>; sa: <trackplan #sectors=8>...</trackplan>
  const tracksectorContentText = (content.match(/<tracksector>([^<]+)<\/tracksector>/) || content.match(/<trackplan[^>]*>([^<]+)<\/trackplan>/))?.[1] || '';
  return tracksectorContentText
    .replaceAll(/[\r\n]+/g, ';')
    .split(';')
    .map(chunk => chunk.trim())
    .filter(Boolean)
    .map(chunk => chunk.split(',').slice(-4).map(Number) as [number, number, number, number]);
}
