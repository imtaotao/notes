const http = require('http')

const getStatusCode = (statusCode) => {
  statusCode |= 0
  return (statusCode < 100 || statusCode > 999) ? 0 : statusCode
}

const sendStatusCodeError = (cltRes, svrRes) => {
  delete svrRes.headers['content-length']
  cltRes.writeHead(502, svrRes.headers)
  cltRes.src('Invalid status code: ' + svrRes.statusCode)
}

module.exports = function(req, res, port) {
  const client = http.request(`http://127.0.0.1:${port}`, childRes => {
    if (getStatusCode(childRes.statusCode)) {
      res.writeHead(childRes.statusCode, childRes.headers)
      childRes.pipe(res)
    } else {
      sendStatusCodeError(res, childRes)
    }
  })

  let destroyed;
  const abort = () => {
    if (!destroyed) {
      destroyed = true
      client.destroy()
    }
  }
  req.on('error', abort)
  res.on('error', abort)
  res.once('close', abort)
  client.on('error', err => {
    abort()
    res.emit('error', err)
  })

  req.pipe(client)
  return client
}