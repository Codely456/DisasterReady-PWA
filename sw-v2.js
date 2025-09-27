const CACHE_NAME = 'disaster-ready-cache-v12'; // Always update the cache name
const FIREBASE_CACHE_NAME = 'firebase-assets-v3';

// Consolidate all essential files into one list for simplicity
const APP_SHELL_ASSETS = [
    '/', // This caches the root URL, which is crucial
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
  '/assets/videos/chapter7-hurricane.mp4',
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
  '/assets/images/login-background-1.jpg',
  '/assets/images/hero-background.jpg',
  '/icons/icon-192x192.svg',
  '/icons/icon-512x512.svg',
  '/chatbot.js',
  '/ui.js',
];
const FIREBASE_ASSETS = [
    'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js',
    'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js',
    'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js'
];

self.addEventListener('install', (event) => {
    console.log('[Service Worker] Install');
    event.waitUntil(
        Promise.all([
            caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL_ASSETS)),
            caches.open(FIREBASE_CACHE_NAME).then(cache => cache.addAll(FIREBASE_ASSETS))
        ]).then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activate');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME && cacheName !== FIREBASE_CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Use a stale-while-revalidate strategy for Firebase assets
    if (url.hostname === 'www.gstatic.com') {
        event.respondWith(
            caches.open(FIREBASE_CACHE_NAME).then(cache => {
                return cache.match(request).then(cachedResponse => {
                    const fetchPromise = fetch(request).then(networkResponse => {
                        cache.put(request, networkResponse.clone());
                        return networkResponse;
                    });
                    return cachedResponse || fetchPromise;
                });
            })
        );
        return;
    }

    // Use a network-falling-back-to-cache strategy for everything else
    event.respondWith(
        fetch(request)
            .catch(() => {
                // If the network fails, serve from the cache
                return caches.match(request).then(cachedResponse => {
                    // If not in cache, and it's a page navigation, show the offline page
                    if (!cachedResponse && request.mode === 'navigate') {
                        return caches.match('/offline.html');
                    }
                    return cachedResponse;
                });
            })
    );
});
