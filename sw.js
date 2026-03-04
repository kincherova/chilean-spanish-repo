self.addEventListener('install', e => {
  e.waitUntil(caches.open('v1'));
});

self.addEventListener('fetch', e => {
  // Only cache HTTP/HTTPS requests
  if (e.request.url.startsWith('http')) {
    e.respondWith(
      caches.match(e.request).then(r => r || fetch(e.request))
    );
  }
});
