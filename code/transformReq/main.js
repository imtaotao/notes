const http = require('http')
const transformReq = require('./utils')
const { spawn } = require('child_process')

spawn('node', [`${__dirname}/childProcessServer.js`], {
  stdio: 'inherit',
})

http.createServer((req, res) => {
  transformReq(req, res, 8000)
}).listen(3000)

http.createServer((req, res) => {
  console.log(req.url);
  res.end('done')
}).listen(3001)
