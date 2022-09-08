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

interface TimeStampFormat {
  /** 是否自动清除值为0的区块 如：00:01:00.875 => 01:00.875 默认为 false */
  autoClearZero?: boolean;
}

/**
 * 格式化时间戳
 * @param timestamp
 * @param format
 */
export function timeStampFormat(timestamp: number, format: string, opts: TimeStampFormat = {}) {
  timestamp = Math.abs(timestamp)
  const ms = timestamp % 1000;
  const s = timestamp / 1000 % 60 | 0;
  const m = timestamp / 1000 / 60 % 60 | 0;
  const h = timestamp / 1000 / 60 / 60 % 60 | 0;

  let result = format
    .replaceAll(/S+/g, match => String(Math.round(ms / Math.pow(10, Math.max(3 - match.length, 0)))).padStart(match.length, '0'))
    .replaceAll(/s+/g, match => String(s).padStart(match.length, '0'))
    .replaceAll(/m+/g, match => String(m).padStart(match.length, '0'))
    .replaceAll(/h+/gi, match => String(h).padStart(match.length, '0'))

  if (opts.autoClearZero) {
    let prev = result;
    do {
      prev = result;
      result = result.replace(/^0+[^.\d]+/, '')
    } while (result !== prev)
    result = result.replace(/^0{2,}/, '0').replace(/^0+([^0.]+)/, '$1');
  }

  return result;
}
