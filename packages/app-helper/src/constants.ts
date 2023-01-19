/** SQLite DB 名称 */
export const DB_NAME = 'RACE_LAB';

/** webview bridge callback 名称 */
export const BRIDGE_CALLBACK_NAME = '$$raceLapCallback';

/** 表名称 */
export const enum DBTableName {
  /** 用户表 */
  USER = 'User',
  /** 载具表 */
  CARRIER = 'Carrier',
  /** 赛道表 */
  RACETRACK = 'Racetrack',
  /** 赛道记录表 */
  RECORD = 'Record',
}

/** EventBus 中的事件名称 */
export const enum EventName {
  /** 通用权限请求完毕 */
  COMMON_PERMISSIONS_REQUEST_READY = 'EVENTBUS:COMMON_PERMISSIONS_REQUEST_READY',
  /** 数据库初始化完毕 */
  DB_INIT_READY = 'EVENTBUS:DB_INIT_READY',
  /** 蓝牙设备已连接 */
  BLE_DEVICE_CONNECTED = 'EVENTBUS:BLE_DEVICE_CONNECTED',
  /** 蓝牙设备已连接后准备工作就绪 */
  BLE_DEVICE_READY = 'EVENTBUS:BLE_DEVICE_READY',
  /** 蓝牙展示文件列表 */
  BLE_LIST_DIR = 'EVENTBUS:BLE_LIST_DIR',
  /** 蓝牙下载文件 */
  BLE_DOWNLOAD_FILE = 'EVENTBUS:BLE_DOWNLOAD_FILE',
  /** 蓝牙删除文件 */
  BLE_DEL_FILE = 'EVENTBUS:BLE_DEL_FILE',
  /** 更新记录列表 */
  REFRESH_RECORD_LIST = 'EVENTBUS:REFRESH_RECORD_LIST',
}

/** web 路由名称 */
export const enum WebRouteName {
  /** 新增赛道 */
  NEW_RACETRACK = 'new-racetrack',
  /** 比赛记录详情柱状图 */
  RECORD_DETAIL_BAR_CHART = 'record-detail-bar-chart',
  /** 比赛记录详情回顾分析 */
  RECORD_DETAIL_REVIEW_ANALYSIS = 'record-detail-review-analysis',
}

/** 当前支持的载具类型 */
export const enum CarrierType {
  /** 未知 */
  UNKNOWN = 'UNKNOWN',
  /** 滑冰鞋 */
  ROLLER_SKATING = 'ROLLER_SKATING',
  /** 自行车 */
  BICYCLE = 'BICYCLE',
  /** 小型摩托车 */
  SCOOTER = 'SCOOTER',
  /** 小型赛车 */
  KART = 'KART',
  /** 野外摩托车 */
  DIRT_BIKE = 'DIRT_BIKE',
  /** 赛车 */
  RACE_CAR = 'RACE_CAR',
}
