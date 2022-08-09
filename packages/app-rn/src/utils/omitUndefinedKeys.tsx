/**
 * 删除指定对象中值为 `undefined` 的键
 * @param obj
 */
export function omitUndefinedKeys<Obj extends Record<string, unknown>>(
  obj: Obj,
): Obj {
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'undefined') {
      delete obj[key];
    }
  });
  return obj;
}

export default omitUndefinedKeys;
