const CACHE = 'nota-assinatura-v1';
const ARQUIVOS = ['./', './index.html', './manifest.json', './icons/icon-192.png', './icons/icon-512.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ARQUIVOS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // não cacheia chamadas à API do Apps Script — só o app estático
  if (event.request.url.includes('script.google.com')) return;

  event.respondWith(
    caches.match(event.request).then((resp) => resp || fetch(event.request))
  );
});
