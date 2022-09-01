import type { SQLite, NSSQLite } from './types';

let sqlite: SQLite | null = null;
let openDBRask: Promise<NSSQLite.SQLiteDatabase> | null = null;

/** 获取 DB 实例 */
export function getDB() {
  if (!sqlite) throw new Error(`Have To Call initialize Before !`);
  if (openDBRask) return openDBRask;
  else {
    sqlite.enablePromise(true);
    openDBRask = sqlite.openDatabase({ name: 'raceLap', location: 'default' })
    return openDBRask;
  }
}

/**
 * 初始化 DB
 * @param sqliteInstance
 */
export function initDB(sqliteInstance: SQLite) {
  sqlite = sqliteInstance;
}
