const CACHE_NAME = 'calculadora-cache-v1';
const urlsToCache = [
  '/',
  '/css/style.css',
  '/js/script.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    async () => {
      try {
        const response = await fetch(event.request);

        if (response.ok) {
          const responseClone = response.clone();
          const cache = await caches.open(CACHE_NAME);
          await cache.put(event.request, responseClone);
        }

        return response;
      } catch (error) {
        const cachedResponse = await caches.match(event.request);
        return cachedResponse || new Response(null, { status: 404, statusText: 'Offline' });
      }
    }
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
      );
    })
  );
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered successfully:', registration);
      })
      .catch((error) => console.error('Error registering Service Worker:', error));
  });
}