const fs = require('fs');
const http = require('http');

// 上传单个文件，接受到二进制文件，直接转存
http.createServer((req, res) => {
  const body = []
  const filepath = './avatar.jpg' 

  res.writeHead(200, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'content-type',
    'Access-Control-Allow-Methods': 'DELETE,PUT,POST,GET,OPTIONS',
  })

  if(req.method === 'POST') {
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath)
    }

    req.on('data', chunk => body.push(chunk))
    req.on('end', () => {
      console.log(req.headers);
      const data = Buffer.concat(body)
      console.log(data.toString());
      fs.writeFileSync(filepath, data)
    })
  };
  res.end('done')
}).listen(3000)
