import { SQLite } from './types';
import { initDB } from './utils';

interface Options {
  /** sqlite 对象 */
  sqlite: SQLite;
}

/**
 * 初始化方法
 * @param opts
 */
export function initialize(opts: Options) {
  initDB(opts.sqlite)
}
