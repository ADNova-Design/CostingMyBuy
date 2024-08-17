const CACHE_NAME = 'calculadora-cache-v1';
const urlsToCache = [
  '/',
  '/calc/css/style.css',
  '/calc/js/script.js'
];

// Install event handler - Caches static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .catch((error) => console.error('Error caching static assets:', error))
  );
});

// Fetch event handler - Handles online and offline requests
self.addEventListener('fetch', (event) => {
  event.respondWith(
    async () => {
      try {
        // Try fetching the request from the network
        const response = await fetch(event.request);
        // Clone the response for caching
        const responseClone = response.clone();
        // Open the cache
        const cache = await caches.open(CACHE_NAME);
        // Put the response in the cache (if successful)
        await cache.put(event.request, responseClone);
        return response;
      } catch (error) {
        // If network fails, try to serve from cache
        return caches.match(event.request);
      }
    }
  );
});

// Activate event handler - Cleans up old cache versions
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
      );
    })
  );
});

// Service Worker registration (optional)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered successfully:', registration);
        if (navigator.onLine) {
          registration.update(); // Update cache on initial load if online
        }
      })
      .catch((error) => console.error('Error registering Service Worker:', error));
  });
}