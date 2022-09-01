import type { Middleware } from '../types';

/**
 * 处理 Function 默认行为，例如 bind、call、apply 等
 * @param ctx
 */
export const functionSimulationHandle: Middleware = next => ctx => {
  const { keyPath = [], currentFactory } = ctx;
  const tailKey = keyPath[keyPath.length - 1];
  if (tailKey === 'bind') {
    return currentFactory(...keyPath.slice(0, -1));
  } else {
    return next(ctx);
  }
}
