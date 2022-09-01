export interface BridgeMsgReq {
  /** 调用 ID */
  id: string;
  /** 调用参数 */
  params?: any[];
  /** 调用链 */
  callChain: string[];
}

export interface BridgeMsgRes {
  /** 调用 ID */
  id: string;
  /** 返回值内容 */
  res: ApiRes;
}

/**
 * 通用 Api 返回结构
 */
export interface ApiRes<T = unknown> {
  /** 错误码 0 为正常，非 0 为失败 */
  errCode: number;
  /** 错误信息 errCode 为 0 是为空 */
  errMsg: string;
  /** 实际返回信息 */
  data: T | null;
}
