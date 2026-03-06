const CACHE_NAME = 'bigtwo-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  // 外部資源（你的遊戲會用到的）
  'https://deckofcardsapi.com/static/img/back.png',
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js',
  'https://cdn.jsdelivr.net/npm/canvas-confetti@1.7.0/dist/confetti.browser.min.js',
  'https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700;900&display=swap'
  // 卡牌圖片太多，會在第一次載入時自動快取
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});