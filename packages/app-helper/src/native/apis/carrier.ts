import type { Carrier, ApiRes } from '../../types';
import { getDB } from '../utils';
import { isErrorLike } from '../../utils';
import { DBTableName } from '../../constants';

interface SaveCarrierParam extends Partial<Carrier> { }

/**
 * 保存信息
 * @param params
 */
export async function save(params: SaveCarrierParam): Promise<ApiRes<number>> {
  try {
    const { id, ...rest } = params;
    const recordInfoEntries = Object.entries(rest).filter(([, value]) => typeof value !== 'undefined');
    const recordInfokeys = recordInfoEntries.map(([key]) => key);
    const recordInfoValues = recordInfoEntries.map(([, value]) => value);
    const db = await getDB();
    let updateRowId: number | null = null;
    if (recordInfokeys.length) {
      if (typeof id === 'undefined') {
        // 新增信息
        [{ insertId: updateRowId }] = await db.executeSql(
          `INSERT INTO ${DBTableName.CARRIER} (${recordInfokeys.join(',')}) VALUES(${recordInfoValues.map(() => '?').join(',')})`,
          recordInfoValues
        );
      } else {
        // 更新信息
        [{ insertId: updateRowId }] = await db.executeSql(
          `UPDATE ${DBTableName.CARRIER} SET ${recordInfokeys.map(key => `${key} = ?`).join(',')} WHERE id = ${id}`,
          recordInfoValues
        );
      }
    }
    return {
      errCode: 0,
      errMsg: '',
      data: updateRowId,
    };
  } catch (err) {
    console.log(err)
    return {
      errCode: 1,
      errMsg:
        (isErrorLike(err) ? err.message : String(err)) ||
        'Save Record Info Failed !',
      data: null,
    };
  }
}

interface GetCarrierListParam extends Partial<Carrier> { }

/**
 * 获取记录列表
 * @param param
 */
export async function getList(params: GetCarrierListParam = {}): Promise<ApiRes<Carrier[]>> {
  try {
    const recordInfoEntries = Object.entries(params).filter(([, value]) => typeof value !== 'undefined');
    const recordInfokeys = recordInfoEntries.map(([key]) => key);
    const recordInfoValues = recordInfoEntries.map(([, value]) => value);
    const hasCondition = !!recordInfokeys.length;
    const db = await getDB();

    const [result] = await db.executeSql(
      `SELECT * FROM ${DBTableName.CARRIER}${hasCondition ? ' WHERE' : ''} ${recordInfokeys.map(key => `${key} = ?`).join(' AND ')} `,
      recordInfoValues
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
        'Get Record List Failed !',
      data: null,
    };
  }
}
