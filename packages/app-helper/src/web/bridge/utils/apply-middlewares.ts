import { Middleware, MiddlewareContext } from '../types'

interface Opts {
  /** 核心层处理函数 */
  coreHandle?: (...args: any[]) => any;
}

/** 核心层处理函数 */
const defaultCoreHandle = () => { }

/**
 * 最外层 middleware
 */
const outermostMiddleware: Middleware = next => (ctx) => {
  return next(ctx);
}

/**
 * 将 middleware 应用到 proxy
 */
export function applyMiddlewares(middlewares: Middleware[], opts: Opts = {}): (ctx: MiddlewareContext) => void {
  const {
    coreHandle = defaultCoreHandle,
  } = opts;
  return [outermostMiddleware]
    .concat(middlewares)
    .reduceRight((next, middleware) => middleware(next), coreHandle);
}
