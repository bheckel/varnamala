// Modified: 29-Jun-2026 (Bob Heckel) 
const CACHE_NAME = 'varnamala-v1';
const ASSETS = [
  '/',
  '/varnamala-flashcards.html',
  '/manifest_flashcards.json',
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
