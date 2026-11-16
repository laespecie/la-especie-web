const CACHE_NAME = 'laespecie-pwa-v1';

// Recursos esenciales que se guardan al instalar la PWA
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/style.css?v=2',
  '/app.js?v=4',
  '/logo.png',
  '/favicon.png',
  '/icon-192.png',
  '/icon-512.png',
  '/icon-512-maskable.png',
  '/apple-touch-icon.png',
  '/manifest.json'
];

// 1. INSTALACIÓN: Guardar recursos clave y activar de inmediato
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[SW] Fallo al precachear algunos recursos:', err);
      });
    })
  );
});

// 2. ACTIVACIÓN: Limpiar cachés antiguas y tomar control de los clientes
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log('[SW] Eliminando caché antigua:', name);
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. FETCH: Estrategias de caché inteligentes
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Solo interceptar peticiones GET dentro de nuestro mismo origen o CDNs seguras
  if (req.method !== 'GET') return;
  if (!url.protocol.startsWith('http')) return;

  // A) NAVEGACIÓN (Páginas HTML): Network First (para que siempre vean noticias frescas)
  // Si no hay internet, muestra la versión guardada en caché; si no está, muestra offline.html
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((networkRes) => {
          if (networkRes && networkRes.status === 200) {
            const clone = networkRes.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
          }
          return networkRes;
        })
        .catch(async () => {
          const cachedRes = await caches.match(req);
          if (cachedRes) return cachedRes;
          const offlineRes = await caches.match('/offline.html');
          return offlineRes || new Response('Sin conexión', { status: 503, headers: { 'Content-Type': 'text/plain' } });
        })
    );
    return;
  }

  // B) DATOS JSON (posts-index.json, notas): Network First con fallback a caché
  if (url.pathname.endsWith('.json')) {
    event.respondWith(
      fetch(req)
        .then((networkRes) => {
          if (networkRes && networkRes.status === 200) {
            const clone = networkRes.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
          }
          return networkRes;
        })
        .catch(() => caches.match(req))
    );
    return;
  }

  // C) RECURSOS ESTÁTICOS (CSS, JS, Imágenes, Fuentes): Stale-While-Revalidate
  // Carga al instante desde la caché y actualiza en segundo plano
  event.respondWith(
    caches.match(req).then((cachedRes) => {
      const fetchPromise = fetch(req)
        .then((networkRes) => {
          if (networkRes && networkRes.status === 200) {
            const clone = networkRes.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
          }
          return networkRes;
        })
        .catch(() => {
          // Si falla la red y no hay caché, no pasa nada grave
        });
      return cachedRes || fetchPromise;
    })
  );
});
