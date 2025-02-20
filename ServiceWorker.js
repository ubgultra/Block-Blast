const cacheName = "reun-Block Blast Puzzle-1.1";
const contentToCache = [
    "https://cdn.jsdelivr.net/gh/ubgultra/Block-Blast@main/Build/BlockBlast1.1-8.loader.js",
    "https://cdn.jsdelivr.net/gh/ubgultra/Block-Blast@main/Build/BlockBlast1.1-8.framework.js.unityweb",
    "https://cdn.jsdelivr.net/gh/ubgultra/Block-Blast@main/Build/BlockBlast1.1-8.data.unityweb",
    "https://cdn.jsdelivr.net/gh/ubgultra/Block-Blast@main/Build/BlockBlast1.1-8.wasm.unityweb",
    "https://cdn.jsdelivr.net/gh/ubgultra/Block-Blast@main/TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
