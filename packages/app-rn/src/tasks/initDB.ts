import SQLite from 'react-native-sqlite-storage';
import { DB_NAME, DBTableName, EventName } from '@race-lap/app-helper';
import { eventBus } from '@race-lap/app-helper/dist/native';

export const initDBTask = new Promise<SQLite.SQLiteDatabase>(r => {
  const handle = (db: SQLite.SQLiteDatabase) => {
    eventBus.off(EventName.DB_INIT_READY, handle);
    r(db);
  };
  eventBus.on(EventName.DB_INIT_READY, handle);
});

// 当前版本的 DB 版本
const CURRENT_DB_VERSION = 1;

export async function initDB() {
  try {
    SQLite.enablePromise(true);

    const db = await SQLite.openDatabase({
      name: DB_NAME,
      location: 'default',
    });

    // await db.executeSql(`DROP TABLE ${DBTableName.USER}`);

    const dbVersion = (
      await db.executeSql('PRAGMA user_version')
    )?.[0].rows.item(0).user_version;

    if (true || !dbVersion) {
      await db.transaction(tx => {
        // Create Table
        // 创建用户表
        tx.executeSql(`CREATE TABLE IF NOT EXISTS ${DBTableName.USER} (
          id TEXT,
          name TEXT,
          carrierId INTEGER,
          racetrackId INTEGER
        )`);
        // 创建载具表
        tx.executeSql(`CREATE TABLE IF NOT EXISTS ${DBTableName.CARRIER} (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          type TEXT
        )`);
        // 创建赛道表
        tx.executeSql(`CREATE TABLE IF NOT EXISTS ${DBTableName.RACETRACK} (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          location TEXT,
          address TEXT,
          tracksector TEXT,
          snapshot TEXT
        )`);
        // 创建记录表
        tx.executeSql(`CREATE TABLE IF NOT EXISTS ${DBTableName.RECORD} (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          carrierId INTEGER,
          racetrackId INTEGER,
          fileHash TEXT,
          fileId TEXT,
          fileSize INTEGER,
          startDate INTEGER,
          version TEXT,
          userId TEXT,
          username TEXT,
          carrierName TEXT,
          hardwareVersion TEXT,
          firmwareVersion TEXT,
          racetrackName TEXT,
          totalTime INTEGER,
          minCycleTime INTEGER,
          maxSpeed TEXT,
          avgSpeed TEXT,
          avgCycleTime INTEGER,
          cycleNum INTEGER
        )`);
        tx.executeSql(`PRAGMA user_version = ${CURRENT_DB_VERSION}`);
      });
    } else if (dbVersion <= CURRENT_DB_VERSION) {
      // 更新库表结构
    } else {
      // 暂无更新
    }
    eventBus.emit(EventName.DB_INIT_READY, db);
  } catch (err) {
    console.error(err);
  }
}
