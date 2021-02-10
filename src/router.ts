export type Aliases = 'get' | 'post' | 'put' | 'delete' | 'del'
interface methodAlias {
  alias: Aliases,
  method: string,
}
const methodAliases: methodAlias[] = [
  {
    alias: 'get',
    method: 'get',
  },
  {
    alias: 'post',
    method: 'post',
  }, {
    alias: 'put',
    method: 'put',
  },
  {
    alias: 'delete',
    method: 'delete',
  },
  {
    alias: 'del',
    method: 'delete',
  },
]

export type HandlerResponse = Promise<Response> | Response
export type Handler = (req: Request) => HandlerResponse
export type HandlerMap = Record<string, Record<string, Handler>>

export class Router {
  _handlerMap: HandlerMap
  constructor() {
    this._handlerMap = {}
  }

  handle(req: Request): HandlerResponse {
    const reqUrl = new URL(req.url)
    const pathname = reqUrl.pathname;
    const method = req.method.toLowerCase();

    const handler = this._handlerMap[method]?.[pathname]
    if (!handler) {
      return new Response('404', { status: 404 });
    }

    return handler(req);
  }
}

export type RouterAliases = { [method in Aliases]: (pathname: string, handler: Handler) => HandlerResponse }

export interface Router extends RouterAliases { }


methodAliases.forEach(methodAlias => {
  Object.defineProperty(Router.prototype, methodAlias.alias, {
    value(this: Router, pathname: string, handler: Handler) {
      this._handlerMap[methodAlias.method] = this._handlerMap[methodAlias.method] || {};
      this._handlerMap[methodAlias.method][pathname] = handler;
    }
  })
})