import type NSSQLite from 'react-native-sqlite-storage';
import type { EventName } from './constants';

export { NSSQLite }

/** EventBus Handler */
export interface EventBusEventMap {
  /** 数据库初始化完毕 */
  [EventName.DB_INIT_READY]: NSSQLite.SQLiteDatabase;
}

export interface BridgeMsgReq {
  /** 调用 ID */
  id: string;
  /** 调用参数 */
  params?: any[];
  /** 调用链 */
  callChain: string[];
}

export interface BridgeMsgRes {
  /** 调用 ID */
  id: string;
  /** 返回值内容 */
  res: ApiRes;
}

/**
 * 通用 Api 返回结构
 */
export interface ApiRes<T = unknown> {
  /** 错误码 0 为正常，非 0 为失败 */
  errCode: number;
  /** 错误信息 errCode 为 0 是为空 */
  errMsg: string;
  /** 实际返回信息 */
  data: T | null;
}

/** 用户信息 */
export interface User {
  /** 唯一 id */
  id: number;
  /** 用户名 */
  name: string;
  /** 载具 id */
  carrierId: number;
}

/** 载具信息 */
export interface Carrier {
  /** 唯一 id */
  id: number;
  /** 载具名称 */
  name: string;
  /** 载具类型 */
  type: string;
}

/** 赛道信息 */
export interface Racetrack {
  /** 唯一 id */
  id: number;
  /** 赛道名称 */
  name: string;
  /** 经纬度，数据格式: 经度，纬度 */
  location: `${string},${string}`;
  /** 详细地址 */
  address: string;
}

/** 纪录信息 */
export interface Record {
  /** 唯一 id */
  id: number;
  /** 用户 id */
  userId: number;
  /** 载具 id */
  carrierId: number;
  /** 赛道 id */
  racetrackId: number;
  /** 开始时间 */
  startTime: number;
  /** 持续时间 */
  durationTime: number;
  /** 圈数 */
  trackNum: number;
  /** 文件 ID (文件地址) */
  fileId: string;
}
