const http = require('http');
const transformReq = require('./utils');

http
  .createServer((req, res) => {
    transformReq(req, res, 3001);
    res.end('xxx');
  })
  .listen(8000);
