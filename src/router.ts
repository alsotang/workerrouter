const methods = ['get', 'post', 'delete', 'put'] as const;
export type Method = typeof methods[number]

export type HandlerResponse = Promise<Response> | Response;
export type Handler = (req: Request) => HandlerResponse;
export type Handlers = Record<Method, Record<string, Handler>>

export class Router {
  _routeHandlers: Handlers
  constructor() {
    this._routeHandlers = {} as Handlers
  }

  handle(req: Request) {
    const reqUrl = new URL(req.url)
    const pathname = reqUrl.pathname;
    const method = req.method.toLowerCase() as Method;

    const handler = this._routeHandlers[method]?.[pathname]
    if (!handler) {
      return new Response('404',  {status: 404});
    }

    return handler(req);
  }
}

export interface Router extends RouterActions {}

export type RouterActions = {[method in Method]: (pathname: string, handler: Handler) => HandlerResponse}

methods.forEach(method => {
  Object.defineProperty(Router.prototype, method.toLocaleLowerCase(), {
    value(pathname: string, handler: Handler) {
      this._routeHandlers[method] = this._routeHandlers[method] ||  {};
      this._routeHandlers[method][pathname] = handler;
    }
  })
})