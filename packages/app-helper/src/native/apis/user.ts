import type { User, ApiRes } from '../../types';
import { getDB } from '../utils';
import { isErrorLike } from '../../utils';
import { DBTableName } from '../../constants';

interface SaveUserParam extends Partial<User> { }

/**
 * 保存用户信息
 * @param params
 */
export async function save(params: SaveUserParam): Promise<ApiRes<void>> {
  try {
    const { id, ...rest } = params;
    const userInfoEntries = Object.entries(rest).filter(([, value]) => typeof value !== 'undefined');
    const userInfokeys = userInfoEntries.map(([key]) => key);
    const userInfoValues = userInfoEntries.map(([, value]) => value);
    const db = await getDB();
    if (userInfoEntries.length) {
      if (typeof id === 'undefined') {
        // 新增用户
        await db.executeSql(
          `INSERT INTO ${DBTableName.USER} (${userInfokeys.join(',')}) VALUES(${userInfoValues.map(() => '?').join(',')})`,
          userInfoValues
        );
      } else {
        // 更新用户信息
        await db.executeSql(
          `UPDATE ${DBTableName.USER} SET ${userInfokeys.map(key => `${key} = ?`).join(',')} WHERE id = ${id}`,
          userInfoValues
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
        'Save User Info Failed !',
      data: null,
    };
  }
}

interface GetUserListParam extends Partial<Pick<User, 'id'>> { }

/**
 * 获取用户列表
 * @param param
 */
export async function getList(params: GetUserListParam = {}): Promise<ApiRes<User[]>> {
  try {
    const userInfoEntries = Object.entries(params).filter(([, value]) => typeof value !== 'undefined');
    const userInfokeys = userInfoEntries.map(([key]) => key);
    const userInfoValues = userInfoEntries.map(([, value]) => value);
    const hasCondition = !!userInfokeys.length;
    const db = await getDB();

    // 更新用户信息
    const [result] = await db.executeSql(
      `SELECT * FROM ${DBTableName.USER}${hasCondition ? ' WHERE' : ''} ${userInfokeys.map(key => `${key} = ?`).join(' AND ')} `,
      userInfoValues
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
