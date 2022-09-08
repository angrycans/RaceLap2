import type { ApiRes } from '../../types';
import { isErrorLike } from '../../utils';
import { getFS } from '../utils';


interface PathInfo {
  /** 赛道文件根路径 */
  racetrackRoot: string;
  /** 比赛记录文件根路径 */
  recordRoot: string;
}

let preTask: Promise<[racetrack: string, record: string]> | null = null;

/**
 * 获取存储路径信息
 */
export async function getInfo(): Promise<ApiRes<PathInfo>> {
  try {
    const fs = getFS()!;
    const storageRootPath = fs.DocumentDirectoryPath;
    preTask = preTask || Promise.all(['racetrack', 'record'].map(async dirname => {
      const rootDirPath = `${storageRootPath}/${dirname}`
      if (!(await fs.exists(rootDirPath))) {
        await fs.mkdir(rootDirPath);
      }
      return rootDirPath;
    })) as Promise<[string, string]>;

    const [racetrackRoot, recordRoot] = await preTask;

    return {
      errCode: 0,
      errMsg: '',
      data: {
        racetrackRoot,
        recordRoot
      }
    }
  } catch (err) {
    console.log(err)
    return {
      errCode: 1,
      errMsg:
        (isErrorLike(err) ? err.message : String(err)) ||
        'Get Path Info Failed !',
      data: null,
    };
  }
}
