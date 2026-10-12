// BrainForge PWA: same-origin shell only, offline navigation, bounded cache.
const CACHE = 'brainforge-v2';
const PREFIX = 'brainforge-';
const CORE = ['./', './index.html', './styles.css', './app.js', './manifest.webmanifest'];
const corePaths = new Set(CORE.map(path => new URL(path, self.location.href).pathname));

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key.startsWith(PREFIX) && key !== CACHE).map(key => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  // Do not intercept third-party APIs, voices, analytics, or unrelated origins.
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).catch(async () => {
      const cache = await caches.open(CACHE);
      return (await cache.match('./index.html')) || Response.error();
    }));
    return;
  }
  if (!corePaths.has(url.pathname)) return;

  event.respondWith(caches.open(CACHE).then(async cache => {
    const hit = await cache.match(request);
    if (hit) return hit;
    const response = await fetch(request);
    // Never cache errors, opaque responses, or unsupported content.
    if (response.ok && response.type === 'basic') {
      await cache.put(request, response.clone());
    }
    return response;
  }));
});
