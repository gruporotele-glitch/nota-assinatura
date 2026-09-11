const CACHE = 'nota-assinatura-v7';
const ARQUIVOS = [
  './', './index.html', './manifest.json', './icon-192.png', './icon-512.png', './logo.png',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ARQUIVOS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((nomes) =>
      Promise.all(
        nomes.filter((nome) => nome !== CACHE).map((nome) => caches.delete(nome))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // não cacheia chamadas à API do Apps Script — só o app estático
  if (event.request.url.includes('script.google.com')) return;

  event.respondWith(
    caches.match(event.request).then((resp) => resp || fetch(event.request))
  );
});
