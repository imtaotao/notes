let latestHeaders = null;

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting()); // 立即跳过等待，进入激活阶段
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim()); // 立即让 SW 控制所有客户端
});

self.addEventListener('fetch', (event) => {
  console.log(event.request.url);
  if (event.request.url.includes('abc')) {
    latestHeaders = {};
    console.log(event.request.headers);
    for (const [key, value] of event.request.headers.entries()) {
      latestHeaders[key] = value;
    }
    const res = new Response(JSON.stringify(latestHeaders));
    event.respondWith(res);
  }
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'getHeaders') {
    event.ports[0].postMessage(latestHeaders || {});
  } else if (event.data && event.data.type === 'unregister') {
    self.registration.unregister().then(() => {
      console.log('SW 已注销');
    });
  }
});
