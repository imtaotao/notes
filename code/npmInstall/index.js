// 下载一个包
const Arborist = require('@npmcli/arborist');

// const options = {
//   add: ['@arco-design/web-react@latest'],
//   path: __dirname,
//   prune: true, // 不要裁剪
//   save: false, // 默认为 true，会改变 package.json 和 package-lock.json
// }
// const arb = new Arborist(options);
// arb.reify(options).then(res => {
//   console.log(res.edgesOut);
// })


const options = {
  prune: false,
  save: false,
  legacyPeerDeps: true,
  registry: 'https://registry.yarnpkg.com/',
  pkgName: 'garfish',
  version: '1.7.1',
  cacheDir: 'node_modules/.wowpack',
  path: __dirname,
  add: [ 'garfish@1.7.1' ]
}
const arb = new Arborist(options);
arb.reify(options).then(res => {
  console.log(res.edgesOut);
})
