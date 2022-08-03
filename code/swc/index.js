const fs = require('fs-extra');
const swc = require('@swc/core');
const { resolve } = require('path');
const r = (p) => resolve(__dirname, p);

const code = fs.readFileSync(r('./template.js'), 'utf-8');
swc.transform(code, {
  isModule: true,
  sourceMaps: true,
  filename: 'template.js',
  jsc: {
    parser: {
      syntax: 'ecmascript',
    },
    transform: {
      ImportDeclaration: (path) => {
        console.log(path);
        path.node.source.value = 'tao'
      },
    },
  },
}).then(output => {
  console.log(output.code);
})