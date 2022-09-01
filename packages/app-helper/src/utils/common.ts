/**
 * 判断某个变量是否是 function
 * @param maybeFunction
 * @returns
 */
export function isFunction(maybeFunction: unknown): maybeFunction is Function {
  return typeof maybeFunction === 'function';
}

/**
 * 根据 path 获取目标属性
 * @param path
 */
export function getPropertyByPath(path: string[]) {
  return function (target: Record<string, any>): Function | null {
    try {
      const func = path.reduce((acc, key) => {
        const targetVal: unknown = acc?.[key];
        return isFunction(targetVal) ? targetVal.bind(acc) : targetVal;
      }, target);
      return typeof func === 'function' ? func : null;
    } catch (err) {
      return null;
    }
  }
}

/**
 * 是否符合 Error 的基本结构
 * @param errLike
 */
export function isErrorLike(errLikeObj: any): errLikeObj is Error {
  return 'message' in errLikeObj;
}
