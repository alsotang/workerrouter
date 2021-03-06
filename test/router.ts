import { Router } from '../src/router'

import test from 'ava';

test('get method', async t => {
  const router = new Router();
  router.get('/aaa/bbb', async (req: Request) => {
    return new Response('hello')
  });

  const response = await router.handle(new Request('https://example.com/aaa/bbb'))
  const text = await response.text()
  t.is(text, 'hello')
});


test('del method', async t => {
  const router = new Router();
  router.del('/aaa/bbb', async (req: Request) => {
    return new Response('hello')
  });

  const response = await router.handle(new Request('https://example.com/aaa/bbb', {
    method: 'DELETE'
  }))
  const text = await response.text()
  t.is(text, 'hello')
});


test('delete method', async t => {
  const router = new Router();
  router.delete('/aaa/bbb', async (req: Request) => {
    return new Response('hello')
  });

  const response = await router.handle(new Request('https://example.com/aaa/bbb', {
    method: 'DELETE'
  }))
  const text = await response.text()
  t.is(text, 'hello')
});
