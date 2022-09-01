import type { SQLite, RNFS } from './types';
import { initDB, initFS } from './utils';

interface Options {
  /** sqlite 对象 */
  sqlite: SQLite;
  /** rn file system */
  fs: RNFS;
}

/**
 * 初始化方法
 * @param opts
 */
export function initialize(opts: Options) {
  initDB(opts.sqlite);
  initFS(opts.fs);
}


