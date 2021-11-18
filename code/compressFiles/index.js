const path = require('path');
const compressing = require('compressing');

// 归档为 tar
function gzip() {
  compressing.tar.compressDir(
    path.resolve(__dirname, './demo'),
    path.resolve(__dirname, './demo.tar'),
  )
  .then(() => {
    // 使用 gzip 压缩，浏览器最常见的接受压缩方式
    compressing.gzip.compressFile(
      path.resolve(__dirname, './demo.tar'),
      path.resolve(__dirname, './demo.gz'),
    )
    .then(() => {
      console.log('success');
    })
    .catch(e => {
      console.error(e);
    });
  })
  .catch(e => {
    console.error(e);
  });
}

function zip() {
  compressing.zip.compressDir(
    path.resolve(__dirname, './demo'),
    path.resolve(__dirname, './demo.zip'),
  )
  .then(() => {
    console.log('success');
  })
  .catch(e => {
    console.error(e);
  });
}

gzip();
// zip();
