import type { RNFS } from './types';
import type { ApiRes } from '../types';
import { getFS, getFSReadyTask } from './utils';
import { isErrorLike } from '../utils';

type BridgeFSKeys = {
  [K in keyof RNFS]: RNFS[K] extends (...args: any[]) => Promise<any> | void ? K : never;
}[keyof RNFS];

type BaseBridgeFS<Keys extends keyof RNFS> = {
  [K in Keys]: RNFS[K] extends (...args: infer P) => Promise<infer R> | infer R ? (...args: P) => ApiRes<R> : RNFS[K];
}

export interface BridgeFS extends BaseBridgeFS<BridgeFSKeys> {

}

/**
 * 创建 bridge 用的 FS
 */
export function createBridgeFS(): BridgeFS {
  const fs = getFS()!;
  const fsReadyTask = getFSReadyTask();
  return Object.keys(fs!).reduce((acc, funcName) => {
    const rawFunc = fs[funcName as keyof RNFS] as Function;
    // TODO: 非标准返回需要特殊处理
    if (typeof rawFunc === 'function') {
      // @ts-ignore
      acc[funcName] = async function (...args: any[]) {
        try {
          return {
            errCode: 0,
            errMsg: '',
            data: await fsReadyTask.then(() => rawFunc(...args))
          } as ApiRes
        } catch (err) {
          console.error(err);
          return {
            errCode: 1,
            errMsg: (isErrorLike(err) ? err.message : String(err)) || `Func [${funcName}] Call Failed !`,
            data: null
          } as ApiRes
        }
      }
    }
    return acc;
  }, {} as BridgeFS);
}
