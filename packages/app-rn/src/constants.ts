export { WebRouteName } from '@race-lap/app-helper';

/** 高德地图 api key */
export const enum AMapKey {
  IOS = '1a927c759ae3cec15eb83f2f0a57de0c',
  ANDROID = '',
}

/** 记录仪设备前缀 */
export const DEVICE_PREFIX = 'RaceLap';

/** 路由名称 */
export const enum RouteName {
  /** 启动页 */
  STARTUP = 'STARTUP',
  /** 用户协议页 */
  USER_AGREEMENT = 'USER_AGREEMENT',
  /** 首页 */
  HOME = 'HOME',
  /** 连接设备 */
  CONNECT_DEVICE = 'CONNECT_DEVICE',
  /** 记录详情页 */
  RECORD_DETAIL = 'RECORD_DETAIL',
  /** 赛道详情页 */
  RACETRACK_DETAIL = 'RACETRACK_DETAIL',
  /** 新增赛道 */
  NEW_RACETRACK = 'NEW_RACETRACK',
  /** 设置车手名称 */
  SET_DRIVER_NAME = 'SET_DRIVER_NAME',
  /** 选择载具 */
  SELECT_CARRIER = 'SELECT_CARRIER',
  /** 选择赛道 */
  SELECT_RACETRACK = 'SELECT_RACETRACK',
  /** 设置 */
  SETTING = 'SETTING',
}

/** 本地持久化缓存键名 */
export const enum AsyncStorageKey {
  /** 是否已经同意用户协议 */
  IS_AGRESS_USER_AGREEMENT = 'ASYNC_STORAGE:IS_AGRESS_USER_AGREEMENT',
  /** web 资源检查变更内容 */
  WEB_BUNDLE_CHECK_CONTENT = 'ASYNC_STORAGE:WEB_BUNDLE_CHECK_CONTENT',
}
