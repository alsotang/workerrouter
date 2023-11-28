**use `itty-router` instead of this package.**

# description

A simple router for Cloudflare Workers.

# usage

```js
import {Router} from '@alsotang/workerrouter'

const router = new Router();
router.get('/aaa/bbb', async (req: Request) => {
  return new Response('hello')
});

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request: Request) {
  return router.handle(request)
}
```