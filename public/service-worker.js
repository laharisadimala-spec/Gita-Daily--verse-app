const CACHE_NAME = 'gita-daily-v7';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.png',
  '/apple-touch-icon.png',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/icons/maskable-192.png',
  '/icons/maskable-512.png',
  '/icons/maskable-192x192.png',
  '/icons/maskable-512x512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(async (cache) => {
        console.log('Service Worker: Caching App Shell and Icons');
        // First pre-cache static assets
        await cache.addAll(ASSETS_TO_CACHE);

        // Now dynamically fetch index.html and parse it for Vite bundler CSS and JS filenames
        try {
          const response = await fetch('/index.html');
          if (response.ok) {
            const htmlText = await response.text();
            
            // Match paths starting with /assets/ and ending with .js or .css
            const assetRegex = /\/assets\/[a-zA-Z0-9_\-\.]+\.(?:js|css)/g;
            const matches = htmlText.match(assetRegex) || [];
            
            // Filter duplicates
            const dynamicAssets = [...new Set(matches)];
            console.log('Service Worker: Found Vite bundles in index.html to pre-cache:', dynamicAssets);
            
            if (dynamicAssets.length > 0) {
              await cache.addAll(dynamicAssets);
            }
          }
        } catch (err) {
          console.error('Service Worker: Failed to pre-cache Vite bundle assets', err);
        }
      })
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Service Worker: Clearing Old Cache', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  const url = event.request.url;
  const isGoogleFont = url.startsWith('https://fonts.googleapis.com') || url.startsWith('https://fonts.gstatic.com');
  const isSameOrigin = url.startsWith(self.location.origin);

  // Only handle same-origin requests or Google Fonts
  if (!isSameOrigin && !isGoogleFont) {
    return;
  }

  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((cachedResponse) => {
      if (cachedResponse) {
        // Fetch in background to update the cache asynchronously with the latest version from network
        fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
            }
          })
          .catch(() => {/* Ignore network errors when offline */});
        return cachedResponse;
      }

      // Network fallback
      return fetch(event.request)
        .then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse;
          }
          
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          
          return networkResponse;
        })
        .catch(() => {
          // If offline and navigating to a route, serve index.html for React Router handling
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html', { ignoreSearch: true });
          }
        });
    })
  );
});

// Handle push notifications
self.addEventListener('push', (event) => {
  let data = {
    title: 'Today’s Gita Wisdom 🌸',
    body: 'Tap to read today’s Bhagavad Gita verse.'
  };

  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = {
        title: 'Today’s Gita Wisdom 🌸',
        body: event.data.text() || 'Tap to read today’s Bhagavad Gita verse.'
      };
    }
  }

  const options = {
    body: data.body,
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-192x192.png',
    vibrate: [100, 50, 100],
    data: {
      url: '/'
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Handle push notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url === '/' && 'focus' in client) {
            return client.focus();
          }
        }
        if (self.clients.openWindow) {
          return self.clients.openWindow('/');
        }
      })
  );
});
