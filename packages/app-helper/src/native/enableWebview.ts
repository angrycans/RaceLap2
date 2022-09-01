import type { WebView, } from './types';
import type { ApiRes } from '../types';
import { getPropertyByPath, isErrorLike } from '../utils';
import { BRIDGE_CALLBACK_NAME } from '../constants';
import { apis } from '.';
import { getFS } from './utils';

const webViewWeakSet = new WeakSet<WebView>();

interface MsgJSONObj {
  /** 调用 ID */
  id: string;
  /** 调用参数 */
  params?: any[];
  /** 调用链 */
  callChain: string[];
}

function sendApiRes(webViewInstance: WebView, apiRes: ApiRes, id: string | null = null) {
  webViewInstance.injectJavaScript(`window.${BRIDGE_CALLBACK_NAME}(${JSON.stringify({
    id,
    res: apiRes
  })})`);
}

/**
 * 允许
 * @param webViewInstance
 */
export function enableWebview(webViewInstance: WebView) {
  const remoteApi = {
    ...apis,
    ...getFS(),
  }
  if (!webViewWeakSet.has(webViewInstance)) {
    webViewWeakSet.add(webViewInstance);
  }
  return {
    async onMessage(msg: string) {
      let msgObj: MsgJSONObj | null = null;
      const apiRes: ApiRes = { data: null, errCode: 0, errMsg: '' }
      try {
        msgObj = JSON.parse(msg);
        if (!Array.isArray(msgObj?.callChain) || msgObj?.callChain.some(key => typeof key !== 'string')) {
          throw new Error(`Invalid callChain !`);
        }
      } catch (err) {
        console.error(err);
        apiRes.errCode = 1;
        apiRes.errMsg = 'Invalid Msg !';
        sendApiRes(webViewInstance, apiRes);
        return;
      }

      const target = getPropertyByPath(msgObj!.callChain)(remoteApi);
      if (!target) {
        apiRes.errCode = 1;
        apiRes.errMsg = `Func [${msgObj!.callChain.join('.')}] Is Not Exist !`;
        sendApiRes(webViewInstance, apiRes, msgObj!.id);
        return;
      }

      try {
        sendApiRes(webViewInstance, await target(...(msgObj?.params || [])), msgObj!.id);
      } catch (err) {
        console.error(err);
        apiRes.errCode = 1;
        apiRes.errMsg = (isErrorLike(err) ? err.message : String(err)) || 'Unknown Error !';
        sendApiRes(webViewInstance, apiRes, msgObj!.id);
        return;
      }
    },
    disbale() {
      webViewWeakSet.delete(webViewInstance);
    }
  }
}
