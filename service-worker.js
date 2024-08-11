// service-worker.js

const CACHE_NAME = 'calculadora-cache-v1';
const urlsToCache = [
  '/',
  '/calc/css/style.css',
  '/calc/js/script.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(CACHE_NAME).then(function(cache) {
      return fetch(event.request).then(function(response) {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch(function() {
      return caches.match(event.request);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME).map(name => {
          return caches.delete(name);
        })
      );
    })
  );
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('service-worker.js')
      .then(function(registration) {
        console.log('Service Worker registrado con éxito:', registration);
        if (navigator.onLine) {
          registration.update();
        }
      })
      .catch(function(error) {
        console.log('Error al registrar el Service Worker:', error);
      });
  });
}