import type { ApiRes } from '../../types';
import { getDB } from '../utils';
import { isErrorLike } from '../../utils';

/**
 * 获取赛道列表
 */
export async function getList(): Promise<ApiRes> {
  try {
    const db = await getDB();
    const [result] = await db.executeSql('select * from Racetrack');
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
        'Get Racetrack List Failed !',
      data: null,
    };
  }
}
