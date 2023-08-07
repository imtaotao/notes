const path = require('path');
const fs = require('fs-extra');

const src = path.resolve(__dirname, './demo');
const dest = path.resolve(__dirname, './demo1');
const dest2 = path.resolve(__dirname, './demo2');

// fs.symlinkSync(src, dest);
console.log(fs.existsSync(dest));
fs.copySync(dest, dest2, {});
