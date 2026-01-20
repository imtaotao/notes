function createSWIframe() {
  return new Promise((resolve, reject) => {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = '/swContainer/test/empty.html';
    iframe.onload = () => resolve(iframe);
    iframe.onerror = (e) => reject(e);
    document.body.appendChild(iframe);
  });
}

function sendMessageToIframe(iframe, message) {
  return new Promise((resolve) => {
    function onMessage(event) {
      if (event.source === iframe.contentWindow && event.data) {
        window.removeEventListener('message', onMessage);
        resolve(event.data);
      }
    }
    window.addEventListener('message', onMessage);
    iframe.contentWindow.postMessage(message, window.location.origin);
  });
}

async function getRequestHeadersViaSW() {
  const iframe = await createSWIframe();
  // 通过 MessageChannel 和 SW 通信拿请求头
  const channel = new MessageChannel();
  return new Promise((resolve, reject) => {
    channel.port1.onmessage = (event) => {
      resolve(event.data);
      // 这里可以根据需求注销 SW 和移除 iframe
      iframe.contentWindow.postMessage(
        { type: 'unregisterSW' },
        window.location.origin,
      );
      iframe.remove();
    };
    // 给 iframe 发送请求头请求，iframe 会转发给 SW
    iframe.contentWindow.postMessage(
      { type: 'getHeaders' },
      window.location.origin,
      [channel.port2],
    );

    // 超时处理
    setTimeout(() => {
      reject(new Error('获取请求头超时'));
      iframe.remove();
    }, 5000);
  });
}

getRequestHeadersViaSW();
