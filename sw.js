// Modified: 15-Jul-2026 (Bob Heckel)
const CACHE_NAME = 'varnamala-v4';
const ASSETS = [
  '/',
  '/varnamala-flashcards.html',
  '/manifest_flashcards.json',
  '/shakti.png',
  '/tattvas_sanskrit.png',
  '/favicon_flashcards.ico'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
