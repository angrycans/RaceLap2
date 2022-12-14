import type { NSSQLite, RNFS } from './types';

let initDBTask: Promise<NSSQLite.SQLiteDatabase> | null = null;
let fs: RNFS | null = null;
let fsReadyRask = Promise.resolve();

/**
 * 初始化 DB
 * @param readyTask
 */
export function initNativeDB(readyTask: Promise<NSSQLite.SQLiteDatabase>) {
  initDBTask = readyTask;
}

/** 获取 DB 实例 */
export async function getDB() {
  if (!initDBTask) throw new Error(`Have To Call initialize Before !`);
  return initDBTask;
}

/**
 * 初始化 FS
 * @param sqliteInstance
 */
export function initNativeFS(rnfs: RNFS) {
  fs = rnfs;
}

/** 获取 FS */
export function getFS() {
  if (!fs) throw new Error(`Have To Call initialize Before !`);
  if (fs) return fs;
}

/**
 * 保存 FS Ready Task
 * @param readyTask
 */
export function saveFSReadyTask(readyTask: Promise<void>) {
  fsReadyRask = readyTask;
}

/**
 * 获取 FS Ready Task
 * @param readyTask
 */
export function getFSReadyTask() {
  return fsReadyRask;
}
