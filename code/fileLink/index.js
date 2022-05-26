const fs = require('fs');
const path = require('path');

// const target = path.resolve(__dirname, './test');
// const dest = path.resolve(__dirname, './test1');
// fs.symlinkSync(target, dest, 'dir');

const m1 = require('./test/a.js');
const m2 = require('./test1/a.js')
console.log(m1 === m2); // 软链创建的也是同一个模块