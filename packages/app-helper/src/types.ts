import type { ObjAddStrKeyPrefix } from 'todash';
import type NSSQLite from 'react-native-sqlite-storage';
import type { Peripheral } from 'react-native-ble-manager';
import type { EventName, CarrierType } from './constants';

export { NSSQLite }

/** EventBus Handler */
export interface EventBusEventMap {
  /** 数据库初始化完毕 */
  [EventName.DB_INIT_READY]: NSSQLite.SQLiteDatabase;
  /** 通用权限请求完毕 */
  [EventName.COMMON_PERMISSIONS_REQUEST_READY]: void;
  /** 蓝牙 设备已连接 */
  [EventName.BLE_DEVICE_CONNECTED]: Device;
  /** 蓝牙 设备已连接后准备工作就绪 */
  [EventName.BLE_DEVICE_READY]: void;
  /** 蓝牙 展示文件列表 */
  [EventName.BLE_LIST_DIR]: string;
  /** 蓝牙 删除文件 */
  [EventName.BLE_DEL_FILE]: string;
  /** 蓝牙 下载文件 */
  [EventName.BLE_DOWNLOAD_FILE]: string;
  /** 更新记录列表 */
  [EventName.REFRESH_RECORD_LIST]: void;
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
export interface UserBase {
  /** 唯一 id */
  id: string;
  /** 用户名 */
  name: string;
  /** 载具 id */
  carrierId: number;
  /** 赛道 id */
  racetrackId: number;
}

export interface User extends UserBase, ObjAddStrKeyPrefix<Carrier, 'carrier'> {

}

/** 载具信息 */
export interface Carrier {
  /** 唯一 id */
  id: number;
  /** 载具名称 */
  name: string;
  /** 载具类型 */
  type: CarrierType;
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
  /** 赛道分段 lng,lat,lng,lat;lng,lat,lng,lat... */
  tracksector: string;
  /** 赛道快照 (img url 地址) */
  snapshot: string;
}

/** 记录元数据 */
export interface RecordMeta {
  /** 文件格式版本 */
  version: string;
  /** 文件开始时间 */
  startDate: string;
  /** 用户ID */
  userId: string;
  /** 用户名称 */
  username: string;
  /** 载具名称 */
  carrierName: string;
  /** 硬件版本 */
  hardwareVersion: string;
  /** 固件版本 */
  firmwareVersion: string;
  /** 赛道名称 */
  racetrackName: string;
}

export interface RecordDataOverview {
  /** 总时间 */
  totalTime: number;
  /** 最短圈时 */
  minCycleTime: number;
  /** 最大速度 */
  maxSpeed: string;
  /** 平均速度 */
  avgSpeed: string;
  /** 平均圈时 */
  avgCycleTime: number;
  /** 圈数 */
  cycleNum: number;
}

/** 纪录信息 */
export interface Record extends Omit<RecordMeta, 'startDate'>, RecordDataOverview {
  /** 唯一 id */
  id: number;
  /** 载具 id */
  carrierId: number;
  /** 赛道 id */
  racetrackId: number;
  /** 文件 ID (文件地址) */
  fileId: string;
  /** 文件 crc32 */
  crc32: number;
  /** 文件开始时间 */
  startDate: number;
}

export interface Device extends Pick<Peripheral, 'name' | 'id'> {
  /** 是否已连接 */
  connected?: boolean;
}
