const CACHE_NAME = 'disaster-ready-v5';
const FIREBASE_CACHE_NAME = 'firebase-cache-v1';
const OFFLINE_URL = '/offline.html';
const EMERGENCY_URL = '/emergency.html';

// Critical assets that MUST be cached immediately for emergency access
const CRITICAL_ASSETS = [
  '/main.html',
  '/emergency.html',  // CRITICAL: Emergency page must always be available
  '/offline.html',
  '/manifest.json'
];

// Additional assets to cache when possible
const STATIC_ASSETS = [
  '/app.js',
  '/firebase.js',
  '/service.js',
  '/ui.js',
  '/data.js',
  '/style.css',
  '/theme.css',
  '/theme.js',
  '/icons/icon-192x192.svg',
  '/icons/icon-512x512.svg',
  '/favicon.ico',
  '/icons/shield-icon.svg',
  '/icons/school-building-icon.svg',
  '/icons/warning-icon.svg',
  '/icons/disaster-icon.svg',
  '/assets/videos/chapter1-fire.mp4',
  '/assets/videos/chapter2-earthquake.mp4',
  '/assets/videos/chapter3-flood.mp4',
  '/assets/videos/chapter4-tornado.mp4',
  '/assets/videos/chapter5-active-shooter.mp4',
  '/assets/videos/chapter6-wildfire.mp4',
  '/assets/videos/chapter7-hurricane.mp4'
  // ADD ALL YOUR NEW IMAGE PATHS HERE:
  '/assets/images/Fire-D&D.jpg',
  '/assets/images/Fire-ext.webp',
  '/assets/images/Response-prot.jpg',
  '/assets/images/flood-dd.webp',
  '/assets/images/flood-dd2.jpg',
  '/assets/images/flood2.jpg',
  '/assets/images/flood22.webp',
  '/assets/images/floodkit.webp',
  '/assets/images/hurricane-dd.jpg',
  '/assets/images/hurricane-kit.png',
  '/assets/images/hurricane-prep.jpg',
  '/assets/images/quake-DD.png',
  '/assets/images/quake-dtd.webp',
  '/assets/images/quake-prot.jpg',
  '/assets/images/tornado-dd.webp',
  '/assets/images/tornado-shel.png',
  '/assets/images/wild-dd.jpg',
  '/assets/images/wild-prep.jpeg',
  '/assets/images/wildfire.jpg'
];

const FIREBASE_ASSETS = [
    'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js',
    'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js',
    'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js'
];

// Install event - cache critical assets first, then others
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching CRITICAL assets first');
        // Cache critical assets first - these MUST succeed
        return cache.addAll(CRITICAL_ASSETS);
      })
      .then(() => {
        return caches.open(CACHE_NAME).then(cache => {
            console.log('Service Worker: Caching additional static assets');
            return Promise.allSettled(
                STATIC_ASSETS.map(asset =>
                  cache.add(asset).catch(err =>
                    console.warn(`Failed to cache ${asset}:`, err)
                  )
                )
            );
        });
      })
      .then(() => {
        return caches.open(FIREBASE_CACHE_NAME).then(cache => {
            console.log('Service Worker: Caching Firebase assets');
            return Promise.allSettled(
                FIREBASE_ASSETS.map(asset =>
                  cache.add(asset).catch(err =>
                    console.warn(`Failed to cache ${asset}:`, err)
                  )
                )
            );
        });
      })
      .then(() => {
        console.log('Service Worker: Installation complete');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Critical cache failed', error);
        // Even if caching fails, still activate for emergency fallback
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== FIREBASE_CACHE_NAME) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip chrome-extension and other non-http requests
  if (!event.request.url.startsWith('http')) return;

  const url = new URL(event.request.url);

  // Handle Firebase assets with a stale-while-revalidate strategy
  if (url.hostname === 'www.gstatic.com') {
    event.respondWith(
        caches.open(FIREBASE_CACHE_NAME).then(cache => {
            return cache.match(event.request).then(cachedResponse => {
                const fetchPromise = fetch(event.request).then(networkResponse => {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
                return cachedResponse || fetchPromise;
            });
        })
    );
    return;
  }

  // Network-first strategy for the manifest file to ensure it's always up-to-date.
  if (event.request.url.includes('manifest.json')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // If we get a valid response, update the cache for offline access
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });
          }
          return response;
        })
        .catch(() => {
          // If the network fails, serve the cached version
          return caches.match(event.request);
        })
    );
    return;
  }

  // For all other requests, use the cache-first strategy
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Return cached version if available
        if (cachedResponse) {
          return cachedResponse;
        }

        // Try to fetch from network
        return fetch(event.request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            // Cache the response for future use
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // Network failed - implement emergency fallback strategy
            if (event.request.mode === 'navigate') {
              console.log('Service Worker: Network failed, implementing emergency fallback');

              // First try to serve emergency page (critical for disaster scenarios)
              return caches.match(EMERGENCY_URL)
                .then((emergencyResponse) => {
                  if (emergencyResponse) {
                    console.log('Service Worker: Serving emergency page');
                    return emergencyResponse;
                  }

                  // Fallback to offline page
                  console.log('Service Worker: Serving offline page');
                  return caches.match(OFFLINE_URL);
                })
                .catch(() => {
                  // Last resort: create a minimal emergency response
                  console.log('Service Worker: Creating minimal emergency response');
                  return new Response(`
                    <!DOCTYPE html>
                    <html><head><title>🚨 EMERGENCY</title>
                    <meta name="viewport" content="width=device-width,initial-scale=1">
                    <style>body{font-family:sans-serif;background:#dc2626;color:white;padding:20px;text-align:center;}
                    .emergency{background:rgba(255,255,255,0.1);padding:20px;border-radius:10px;margin:20px 0;}
                    .contact{font-size:1.5rem;margin:10px 0;}</style></head>
                    <body><h1>🚨 EMERGENCY ACCESS</h1>
                    <div class="emergency"><h2>📞 EMERGENCY CONTACTS</h2>
                    <div class="contact">🚑 Emergency: <strong>112</strong></div>
                    <div class="contact">🚒 Fire: <strong>101</strong></div>
                    <div class="contact">👮 Police: <strong>100</strong></div>
                    <div class="contact">🏥 Medical: <strong>108</strong></div></div>
                    <div class="emergency"><h3>⚡ IMMEDIATE ACTIONS</h3>
                    <p>1. STAY CALM<br>2. ENSURE SAFETY<br>3. CALL FOR HELP<br>4. FOLLOW EVACUATION</p></div>
                    </body></html>
                  `, {
                    headers: { 'Content-Type': 'text/html' }
                  });
                });
            }

            // For other requests, try to find a cached version
            return caches.match(event.request);
          });
      })
  );
});

// Background sync for when connection is restored
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('Service Worker: Background sync triggered');
    // Handle any pending operations when connection is restored
  }
});

// Push notifications (for future emergency alerts)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    console.log('Service Worker: Push notification received', data);
    
    const options = {
      body: data.body || 'Emergency alert from DisasterReady',
      icon: '/icons/icon-192x192.svg',
      badge: '/icons/warning-icon.svg',
      vibrate: [200, 100, 200],
      tag: 'emergency-alert',
      requireInteraction: true,
      actions: [
        {
          action: 'view',
          title: 'View Details'
        },
        {
          action: 'dismiss',
          title: 'Dismiss'
        }
      ]
    };

    event.waitUntil(
      self.registration.showNotification(data.title || 'Emergency Alert', options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/?emergency=true')
    );
  }
});

console.log('Service Worker: Loaded successfully');
