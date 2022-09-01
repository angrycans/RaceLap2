import type { Middleware } from '../types';
import type { BridgeMsgReq, BridgeMsgRes, ApiRes } from '../../../types';
import { getPropertyByPath } from '../../../utils';
import { BRIDGE_CALLBACK_NAME } from '../../../constants';

declare global {
  interface Window {
    /**
     * React Native Webview
     * @see https://github.com/react-native-webview/react-native-webview/blob/dbb9a72304e14da714d02b7ca117ebdf900bb301/docs/Reference.md#onmessage
     * */
    ReactNativeWebView?: {
      postMessage(data: string): void;
    }
  }
}

/**
 * 常规调用
 * @param ctx
 */
export const commonApplyHandle: Middleware = () => async ctx => {
  const { keyPath, rawApi, args, eventBus } = ctx;
  const params = args || [];
  try {
    const target = getPropertyByPath(keyPath)(rawApi);
    if (typeof target === 'function') {
      return target(...params);
    } else if (window.ReactNativeWebView) {
      const id = String(Math.random())
      window.ReactNativeWebView?.postMessage(JSON.stringify({
        id,
        params,
        callChain: keyPath
      } as BridgeMsgReq));
      let eventHandle: (msgRes: unknown) => void;
      return Promise.race([
        new Promise<ApiRes>((resolve) => {
          eventHandle = (msgRes: unknown) => {
            const { id: resId, res } = msgRes as BridgeMsgRes;
            if (id === resId) {
              resolve(res);
              eventBus.off(BRIDGE_CALLBACK_NAME, eventHandle);
            }
          }
          eventBus.on(BRIDGE_CALLBACK_NAME, eventHandle);
        }),
        new Promise<ApiRes>((resolve) => {
          setTimeout(() => {
            eventBus.off(BRIDGE_CALLBACK_NAME, eventHandle);
            resolve({
              errCode: 1,
              errMsg: `Func [${keyPath.join('.')}] Call Timeout !`,
              data: null
            });
          }, 5 * 1000);
        })
      ])
    } else {
      return {
        errCode: 1,
        errMsg: `Func [${keyPath.join('.')}] Not Exist !`,
        data: null
      }
    }
  } catch (err) {
    return {
      errCode: 1,
      errMsg: (err instanceof Error ? err.message : String(err)) || `Func [${keyPath.join('.')}] Call Failed !`,
      data: null
    }
  }
}
