/* BUGpairoj Color Picker Studio — service worker (generated at build time; do not edit dist/sw.js).
 * Precaches the whole app shell so the local image picker works offline. Images the user opens
 * are never fetched over the network, so nothing user-related is ever stored in this cache. */
const VERSION = '7b441a91fb0b';
const PRECACHE = [
  "./",
  "assets/index-BW43OgMZ.css",
  "assets/index-ET8h1pKK.js",
  "assets/jetbrains-mono-cyrillic-400-normal-BEIGL1Tu.woff2",
  "assets/jetbrains-mono-cyrillic-ext-400-normal-C_uLvvQ5.woff2",
  "assets/jetbrains-mono-greek-400-normal-C190GLew.woff2",
  "assets/jetbrains-mono-latin-400-normal-V6pRDFza.woff2",
  "assets/jetbrains-mono-latin-ext-400-normal-Bc8Ftmh3.woff2",
  "assets/jetbrains-mono-vietnamese-400-normal-ByoDsISC.woff2",
  "assets/paletteWorker-CuTpMjBu.js",
  "assets/prompt-latin-300-normal-CW7rmI5T.woff2",
  "assets/prompt-latin-400-normal-BQ9zjSN8.woff2",
  "assets/prompt-latin-500-normal-CxzxEHZc.woff2",
  "assets/prompt-latin-600-normal-hKZWXsc1.woff2",
  "assets/prompt-latin-ext-300-normal-BveSF7za.woff2",
  "assets/prompt-latin-ext-400-normal-DdSafGZ9.woff2",
  "assets/prompt-latin-ext-500-normal--EZ1um7s.woff2",
  "assets/prompt-latin-ext-600-normal-Cg9L7iJU.woff2",
  "assets/prompt-thai-300-normal-qs9oCq2b.woff2",
  "assets/prompt-thai-400-normal-BrkKv8cO.woff2",
  "assets/prompt-thai-500-normal-C18pDUoL.woff2",
  "assets/prompt-thai-600-normal-MrdfU7zR.woff2",
  "assets/prompt-vietnamese-300-normal-CzHbdZ_C.woff2",
  "assets/prompt-vietnamese-400-normal-BCPzsgPT.woff2",
  "assets/prompt-vietnamese-500-normal-DmzxmPwa.woff2",
  "assets/prompt-vietnamese-600-normal-7QWjJBsF.woff2",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-maskable-512.png",
  "icons/logo.svg",
  "manifest.webmanifest",
  "samples/alpha-steps-96x32.png",
  "samples/brand-bands-100.png",
  "samples/quadrants-16.png",
  "samples/red-64.png",
  "samples/test-pattern-8x8.png",
  "samples/white-black-64.png",
  "theme-init.js",
  "index.html"
];
const CACHE = `bp-cps-${VERSION}`;
const scopeUrl = (p) => new URL(p, self.registration.scope).href;
// Vite tags use crossorigin (request carries Origin) and some servers send `Vary: Origin`,
// so matching must ignore Vary or every precached asset would miss.
const MATCH = { ignoreSearch: true, ignoreVary: true };

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE.map(scopeUrl))));
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k.startsWith('bp-cps-') && k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin || !req.url.startsWith(self.registration.scope)) return;

  if (req.mode === 'navigate') {
    // network-first for the page (fresh when online), cached shell when offline
    if (!self.navigator.onLine) { event.respondWith(caches.match(req, MATCH).then((hit) => hit ?? caches.match(scopeUrl('index.html'), MATCH))); return; }
    event.respondWith(fetch(req).catch(async () => (await caches.match(req, MATCH)) ?? caches.match(scopeUrl('index.html'), MATCH)));
    return;
  }
  // hashed assets: cache-first
  event.respondWith(caches.match(req, MATCH).then((hit) => hit ?? fetch(req)));
});
