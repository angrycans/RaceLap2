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
  /** 数据库初始化完毕 */
  DB_INIT_READY = 'EVENTBUS:DB_INIT_READY',
}

/** web 路由名称 */
export const enum WebRouteName {
  /** 新增赛道 */
  NEW_RACETRACK = 'new-racetrack',
  /** 比赛记录详情柱状图 */
  RECORD_DETAIL_BAR_CHART = 'record-detail-bar-chart',
}
