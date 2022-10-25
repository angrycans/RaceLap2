import type { NSSQLite, RNFS } from './types';
import { initNativeDB, initNativeFS, saveFSReadyTask } from './utils';

interface Options {
  /** rn file system */
  fs: RNFS;
  /** rn file system */
  commonPermissionsRequestReady: Promise<void>;
  /** 数据库初始化完毕 */
  initDBTask: Promise<NSSQLite.SQLiteDatabase>;
}

/**
 * 初始化方法
 * @param opts
 */
export function initialize(opts: Options) {
  initNativeDB(opts.initDBTask);
  saveFSReadyTask(opts.commonPermissionsRequestReady)
  initNativeFS(opts.fs);
}


