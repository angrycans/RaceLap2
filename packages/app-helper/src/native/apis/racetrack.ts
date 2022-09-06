import type { ApiRes, Racetrack } from '../../types';
import { getDB } from '../utils';
import { isErrorLike } from '../../utils';
import { DBTableName } from '../../constants';

interface SaveRacetrackParam extends Partial<Racetrack> { }

/**
 * 保存信息
 */
export async function save(params: SaveRacetrackParam): Promise<ApiRes<void>> {
  try {
    const { id, ...rest } = params;
    const racetrackInfoEntries = Object.entries(rest).filter(([, value]) => typeof value !== 'undefined');
    const racetrackInfokeys = racetrackInfoEntries.map(([key]) => key);
    const racetrackInfoValues = racetrackInfoEntries.map(([, value]) => value);
    const db = await getDB();
    if (racetrackInfoEntries.length) {
      if (typeof id === 'undefined') {
        // 新增用户
        await db.executeSql(
          `INSERT INTO ${DBTableName.RACETRACK} (${racetrackInfokeys.join(',')}) VALUES(${racetrackInfoValues.map(() => '?').join(',')})`,
          racetrackInfoValues
        );
      } else {
        // 更新用户信息
        await db.executeSql(
          `UPDATE ${DBTableName.RACETRACK} SET ${racetrackInfokeys.map(key => `${key} = ?`).join(',')} WHERE id = ${id}`,
          racetrackInfoValues
        );
      }
    }
    return {
      errCode: 0,
      errMsg: '',
      data: null,
    };
  } catch (err) {
    console.log(err)
    return {
      errCode: 1,
      errMsg:
        (isErrorLike(err) ? err.message : String(err)) ||
        'Save Racetrack Info Failed !',
      data: null,
    };
  }
}

interface GetRacetrackListParam extends Partial<Pick<Racetrack, 'id'>> {

}

/**
 * 获取列表
 * @param param
 */
export async function getList(params: GetRacetrackListParam = {}): Promise<ApiRes<Racetrack[]>> {
  try {
    const racetrackInfoEntries = Object.entries(params).filter(([, value]) => typeof value !== 'undefined');
    const racetrackInfokeys = racetrackInfoEntries.map(([key]) => key);
    const racetrackInfoValues = racetrackInfoEntries.map(([, value]) => value);
    const hasCondition = !!racetrackInfokeys.length;
    const db = await getDB();

    // 更新信息
    const [result] = await db.executeSql(
      `SELECT * FROM ${DBTableName.RACETRACK}${hasCondition ? ' WHERE' : ''} ${racetrackInfokeys.map(key => `${key} = ?`).join(' AND ')} `,
      racetrackInfoValues
    );

    return {
      errCode: 0,
      errMsg: '',
      data: result.rows.raw(),
    };
  } catch (err) {
    console.log(err)
    return {
      errCode: 1,
      errMsg:
        (isErrorLike(err) ? err.message : String(err)) ||
        'Get User List Failed !',
      data: null,
    };
  }
}
