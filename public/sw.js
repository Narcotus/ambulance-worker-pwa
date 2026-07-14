// Service Worker для оффлайн-работы СМП Ассистента
const CACHE_NAME = 'smp-assistant-v2'

// Ресурсы для предварительного кеширования
const PRECACHE_URLS = [
  '/',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
]

// Установка — кешируем критически важные ресурсы
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS)
    })
  )
  self.skipWaiting()
})

// Активация — удаляем старые кеши
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    })
  )
  self.clients.claim()
})

// Fetch — stale-while-revalidate
self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return

  // Навигационные запросы (HTML-страницы): сеть → кеш → офлайн-фолбэк
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy))
          return response
        })
        .catch(() => {
          return caches.match(request).then((cached) => {
            return cached || caches.match('/')
          })
        })
    )
    return
  }

  // Остальные ресурсы: кеш → сеть → кешируем
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached

      return fetch(request).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response
        }

        const responseClone = response.clone()
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseClone)
        })

        return response
      }).catch(() => {
        // Для изображений — заглушка
        if (request.destination === 'image') {
          return new Response(
            '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect fill="#eee" width="200" height="200"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#999" font-size="14">Offline</text></svg>',
            { headers: { 'Content-Type': 'image/svg+xml' } }
          )
        }
        return new Response('Offline', { status: 503 })
      })
    })
  )
})

// Сообщение от клиента — принудительное обновление
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting()
  }
})
