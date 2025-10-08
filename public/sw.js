// const MODEL_CACHE = "llm-assets-v1";
// const MODEL_EXTENSIONS = [".bin", ".json", ".wasm"];

// // --- INSTALL ---
// self.addEventListener("install", (event) => {
//   console.log("[SW] install");
//   self.skipWaiting(); // força nova versão a assumir
// });

// // --- ACTIVATE ---
// self.addEventListener("activate", (event) => {
//   console.log("[SW] activate");
//   event.waitUntil(
//     caches.keys().then((keys) =>
//       Promise.all(
//         keys
//           .filter((key) => key !== MODEL_CACHE)
//           .map((key) => caches.delete(key))
//       )
//     ).then(() => self.clients.claim())
//   );
// });

// // --- FETCH ---
// self.addEventListener("fetch", (event) => {
//   const req = event.request;
//   const url = req.url;

//   // só intercepta GET e arquivos da IA
//   if (req.method !== "GET") return;
//   if (!MODEL_EXTENSIONS.some((ext) => url.endsWith(ext))) return;

//   event.respondWith(
//     caches.open(MODEL_CACHE).then(async (cache) => {
//       const cached = await cache.match(req);
//       if (cached) {
//         console.log("[SW] cache hit:", url);
//         return cached;
//       }

//       console.log("[SW] fetch da rede e cache:", url);
//       const response = await fetch(req);
//       if (response && response.ok) {
//         cache.put(req, response.clone());
//       }
//       return response;
//     })
//   );
// });
