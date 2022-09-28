import type { Emitter, EventType } from 'mitt';
import type { ApiRes } from '../../types';

/** 中间件上下文 */
export interface MiddlewareContext {
  /** 原始 Api 对象，用于底层调用 */
  readonly rawApi: Record<string, any>;
  /** 调用键 path 列表 */
  readonly keyPath: string[];
  /** 调用参数 */
  readonly args: any[];

  // /** 当前所属 Facory，常用于递归创建调用链 */
  readonly currentFactory: (...args: string[]) => Promise<ApiRes>;
  // /** 事件总线 */
  readonly eventBus: Emitter<Record<EventType, unknown>>;
}

export type Middleware = (next: (ctx: MiddlewareContext) => void | Promise<ApiRes>) => (ctx: MiddlewareContext) => void | Promise<ApiRes>;
