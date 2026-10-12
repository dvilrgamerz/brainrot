import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const source = readFileSync(new URL('../sw.js', import.meta.url), 'utf8');
function setup(network = async () => ({ok: true, type: 'basic', clone() { return this; }})) {
  const handlers = {};
  const removed = [];
  const cache = {
    addAll: async () => {},
    match: async key => key === './index.html' ? { offline: true } : undefined,
    put: async () => {}
  };
  const caches = {
    open: async () => cache,
    keys: async () => ['brainforge-v1', 'brainforge-v2', 'other-app-v1'],
    delete: async key => { removed.push(key); return true; }
  };
  const self = {
    location: { origin: 'https://brainforge.test', href: 'https://brainforge.test/sw.js' },
    addEventListener: (name, callback) => { handlers[name] = callback; },
    skipWaiting: async () => {},
    clients: { claim: async () => {} }
  };
  vm.runInNewContext(source, { self, caches, fetch: network, URL, Response: { error: () => ({ failed: true }) }, Set, Promise });
  return { handlers, removed };
}
function respond(handler, request) {
  const event = { request, respondWith(promise) { this.response = promise; } };
  handler(event);
  return event;
}
test('does not intercept requests to outside domains or unrelated APIs', () => {
  const { handlers } = setup();
  assert.equal(respond(handlers.fetch, { method: 'GET', mode: 'cors', url: 'https://other.test/data' }).response, undefined);
  assert.equal(respond(handlers.fetch, { method: 'GET', mode: 'cors', url: 'https://brainforge.test/api/private' }).response, undefined);
  assert.equal(respond(handlers.fetch, { method: 'POST', mode: 'cors', url: 'https://brainforge.test/app.js' }).response, undefined);
});
test('offline navigation returns the cached application shell', async () => {
  const { handlers } = setup(async () => { throw new Error('offline'); });
  const event = respond(handlers.fetch, { method: 'GET', mode: 'navigate', url: 'https://brainforge.test/' });
  assert.deepEqual(await event.response, { offline: true });
});
test('activation deletes prior BrainForge caches and leaves other apps alone', async () => {
  const { handlers, removed } = setup();
  const event = { waitUntil(promise) { this.promise = promise; } };
  handlers.activate(event);
  await event.promise;
  assert.deepEqual(removed, ['brainforge-v1']);
});
