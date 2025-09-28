// A new, more descriptive cache name. You should update this version number (e.g., v12, v13) whenever you make changes.
const CACHE_NAME = 'edushield-cache-v11';
const FIREBASE_CACHE_NAME = 'firebase-assets-v2';

// A single, clean list of every file needed for the app to work offline.
const APP_SHELL_ASSETS = [
    '/',
    '/index.html',
    '/main.html',
    '/emergency.html',
    '/offline.html',
    '/manifest.json',
    '/app.js',
    '/firebase.js',
    '/service.js',
    '/ui.js',
    '/data.js',
    '/chatbot.js',
    '/style.css',
    '/assets/images/login-background-1.jpg',
    '/assets/images/hero-background.jpg',
    '/favicon.ico',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png'
    // Note: For a production app, you would add all images and videos here
    // to ensure they are available offline. For now, this core list is sufficient.
];

const FIREBASE_ASSETS = [
    'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js',
    'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js',
    'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js'
];

// On install, cache the app shell and Firebase assets
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Install');
    event.waitUntil(
        Promise.all([
            caches.open(CACHE_NAME).then((cache) => {
                console.log('[Service Worker] Caching App Shell');
                return cache.addAll(APP_SHELL_ASSETS);
            }),
            caches.open(FIREBASE_CACHE_NAME).then((cache) => {
                console.log('[Service Worker] Caching Firebase Assets');
                return cache.addAll(FIREBASE_ASSETS);
            })
        ]).then(() => self.skipWaiting())
    );
});

// On activate, clean up old caches to save space
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activate');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME && cacheName !== FIREBASE_CACHE_NAME) {
                        console.log('[Service Worker] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// On fetch, implement the correct caching strategies
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Strategy for Firebase assets: Stale-While-Revalidate
    if (url.hostname === 'www.gstatic.com') {
        event.respondWith(
            caches.open(FIREBASE_CACHE_NAME).then(cache =>
                cache.match(request).then(cachedResponse => {
                    const fetchPromise = fetch(request).then(networkResponse => {
                        cache.put(request, networkResponse.clone());
                        return networkResponse;
                    });
                    return cachedResponse || fetchPromise;
                })
            )
        );
        return;
    }

    // Strategy for all other app assets: Network Falling Back to Cache
    event.respondWith(
        fetch(request)
            .catch(() => {
                // If the network request fails (because we are offline),
                // serve the requested file from the cache.
                return caches.match(request).then(cachedResponse => {
                    // If the file is in the cache, serve it.
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    // If it's a page navigation and it's not in the cache, show the offline page.
                    if (request.mode === 'navigate') {
                        return caches.match('/offline.html');
                    }
                    // For other failed requests (like images not in cache), just let them fail.
                    return new Response(null, { status: 404 });
                });
            })
    );
});
