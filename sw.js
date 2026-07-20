// Modified: 15-Jul-2026 (Bob Heckel)
const CACHE_NAME = 'varnamala-v6';
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

// Clean up old caches when the new one activates
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);

  // 1. ONLY intercept local requests. 
  // If the request is to an external domain, let it pass straight through.
  if (url.origin !== self.location.origin) {
    return; 
  }

  // 2. Only intercept standard GET requests (ignores chrome extensions, etc.)
  if (e.request.method !== 'GET') {
    return;
  }

  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});

