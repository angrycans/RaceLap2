/**
 * 获取指定值在给定列表内最近的值
 * @param value 给定制
 * @param list 可选列表
 */
export function getNearestValue<T extends number>(value: number, list: T[]): T {
  return list
    .map(item => ({ raw: item, delta: Math.abs(item - value) }))
    .sort((a, b) => a.delta - b.delta)[0].raw;
}

export default getNearestValue;
