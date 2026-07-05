const fs = require('fs');
const path = require('path');

const manifest = {
  "name": "NexEo Streaming",
  "short_name": "NexEo",
  "description": "Personal Local Video Streaming App",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#000000",
  "theme_color": "#7c3aed",
  "icons": [
    {
      "src": "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%237c3aed' rx='20'/><text x='50' y='65' font-size='50' text-anchor='middle' fill='white'>🎬</text></svg>",
      "type": "image/svg+xml",
      "sizes": "any"
    },
    {
      "src": "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%237c3aed' rx='20'/><text x='50' y='65' font-size='50' text-anchor='middle' fill='white'>🎬</text></svg>",
      "sizes": "192x192",
      "type": "image/svg+xml"
    },
    {
      "src": "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%237c3aed' rx='20'/><text x='50' y='65' font-size='50' text-anchor='middle' fill='white'>🎬</text></svg>",
      "sizes": "512x512",
      "type": "image/svg+xml"
    }
  ]
};

fs.writeFileSync(path.join(__dirname, 'public', 'manifest.json'), JSON.stringify(manifest, null, 2));

const sw = `
const CACHE_NAME = 'nexeo-v1';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/css/style.css',
        '/js/app.js',
        'https://cdn.plyr.io/3.7.8/plyr.css',
        'https://cdn.plyr.io/3.7.8/plyr.js'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  // Hanya intercept GET request dan hindari API call
  if (event.request.method !== 'GET' || event.request.url.includes('/api/')) return;
  
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
`;

fs.writeFileSync(path.join(__dirname, 'public', 'sw.js'), sw);
