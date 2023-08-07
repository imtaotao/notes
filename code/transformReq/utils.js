const http = require('http');
const HTTP_PORT_RE = /:80$/;
const HTTPS_PORT_RE = /:443$/;

function getFullUrl(req) {
  const headers = req.headers;
  let path;
  let isHttps = false;
  let protocol = 'http://';
  let host = headers['x-forwarded-host'];

  // 如果是协议
  if (/^[a-z0-9.-]+:\/\//i.test(req.url)) {
    const options = parse(req.url);
    if (options.protocol === 'https:') {
      isHttps = true;
      protocol = 'https://';
    }
    path = options.path;
    if (options.host) {
      headers.host = options.host;
    }
  } else {
    path = req.url || '/';
    if (path[0] !== '/') path = `/${path}`;
  }

  if (host) {
    delete headers['x-forwarded-host'];
  }
  // 兜底 host
  if (!host || typeof host !== 'string') {
    host = headers.host;
    if (typeof host !== 'string') {
      host = headers.host = '';
    }
  } else if (headers.host !== host) {
    headers.host = host;
  }

  if (host) {
    host = host.replace(isHttps ? HTTPS_PORT_RE : HTTP_PORT_RE, '');
  }
  return protocol + host + path;
}

module.exports = function (req, res, host, port) {
  const options = parse(getFullUrl(req));
  const headers = req.headers;
  options.method = req.method;
  options.agent = false;
  options.protocol = null;
  options.hostname = null;
  options.headers = headers;
  options.port = port;
  options.host = host || '127.0.0.1';

  const client = http.request(options, (publicRes) => {
    const origin =
      !publicRes.headers['access-control-allow-origin'] && req.headers.origin;
    if (origin) {
      publicRes.headers['access-control-allow-origin'] = origin;
      publicRes.headers['access-control-allow-credentials'] = true;
    }
    res.writeHead(publicRes.statusCode, publicRes.headers);
    publicRes.pipe(res);
  });

  let destroyed;
  const abort = () => {
    if (!destroyed) {
      destroyed = true;
      client.destroy();
    }
  };
  req.on('error', abort);
  res.on('error', abort);
  res.once('close', abort);
  client.on('error', (err) => {
    abort(err);
    res.emit('error', err);
  });
  req.pipe(client);
  return client;
};
