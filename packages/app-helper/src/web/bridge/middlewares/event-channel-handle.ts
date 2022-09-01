import type { Middleware } from '../types';

/**
 * 处理 Function 默认行为，例如 bind、call、apply 等
 * @param ctx
 */
export const eventChannelHandle: Middleware = next => ctx => {
  const { keyPath = [], args, eventBus } = ctx;
  const tailKeyStr = keyPath.join('.');
  const tailKey = keyPath[ctx.keyPath.length - 1];

  try {
    if (/EventBus\.[^.]+$/.test(tailKeyStr)) {
      if (tailKey === 'on') {
        const [eventName, cb] = args;
        eventBus.on(eventName, cb);
      } else if (tailKey === 'once') {
        // const [eventName, cb] = args;
        // eventBus.once(eventName, cb);
      } else if (tailKey === 'off') {
        const [eventName, cb] = args;
        eventBus.off(eventName, cb);
      } else if (tailKey === 'emit') {
        const [eventName, eventParam] = args;
        // TODO: real connect
        console.log(eventName, eventParam);
      } else {
        return next(ctx);
      }
    } else {
      return next(ctx);
    }
  } catch (err) {
    const errorDetailMsg = (err instanceof Error ? err?.message : '') || '未知异常';
    return Promise.resolve({
      errCode: -1,
      /** 错误信息 */
      errMsg: errorDetailMsg,
      /** api 调用返回类型 */
      data: null
    })
  }
}
