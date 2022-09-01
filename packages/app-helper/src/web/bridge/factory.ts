import { applyMiddlewares, eventBus } from './utils';
import { functionSimulationHandle } from './middlewares/function-simulation-handle';
import { commonApplyHandle } from './middlewares/common-apply-handle';
import { eventChannelHandle } from './middlewares/event-channel-handle';

export const createBridge = (api: Record<string, any>) => {
  // 创建模拟对象
  const noop = () => { };

  const chain = applyMiddlewares(
    [
      functionSimulationHandle,
      eventChannelHandle,
      commonApplyHandle,
    ]
  );

  const bridgeFactory = (...propKeys: string[]): any => new Proxy(noop, {
    get(_, propKey: string) {
      return ['__proto__'].includes(propKey) ? Function.prototype : bridgeFactory(...propKeys.filter(Boolean), propKey);
    },
    apply(_, __, argArray: any[]) {
      /**
       * 1. 模拟 Function 默认行为
       * 2. 处理 EventChannel 调用
       * 3. 处理事件监听
       * 4. 处理 同步/异步 调用
       * 5. 单独处理 navigateTo 相关 api 的调用
       * 6. 通用的 api 调用处理
       */
      try {
        return chain({
          eventBus,
          rawApi: api,
          currentFactory: bridgeFactory,
          keyPath: propKeys,
          args: argArray
        })
      } catch (err) {
        console.log('err --->', err)
      }
    }
  });

  return bridgeFactory();
}
