const { read } = require('libnpmfund');
const path = require('path');
const search = require('libnpmsearch');
const packument = require('libnpm/packument');
const pacote = require('pacote');
const { parse, evaluate } = require('@rustle/html-parse');

;(async () => {
  // const fundingInfo = await read()
  // console.log(fundingInfo);
  // const data = await search('@types/react');
  // console.log(data[0].maintainers);
  // const data = await packument('@types/react');
  // console.log(data);

  try {
    const manifest = await pacote.manifest('@types/react@*')
    console.log(manifest);
    // const dest = path.resolve(__dirname, `./modules/@types/react@*`);
    // const res = await pacote.extract(manifest.dist.tarball, dest);
    // console.log(res);
  } catch(e) {
    console.log('error', e);
  }
})()

// const ast = evaluate(parse(' <reference types="@garfish/browser-vm" />'), (tag, props) => ({tag, props}));
// console.log(ast);