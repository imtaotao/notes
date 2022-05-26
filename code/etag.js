var crypto = require('crypto')

function entitytag (entity) {
  // compute hash of entity
  var hash = crypto
    .createHash('sha1')
    .update(entity, 'utf8')
    .digest('base64')
    .substring(0, 27)

  // compute length of entity
  var len = typeof entity === 'string'
    ? Buffer.byteLength(entity, 'utf8')
    : entity.length

  return '"' + len.toString(16) + '-' + hash + '"'
}

function md5(entity) {
  const hash = crypto
  .createHash('md5')
  .update(entity, 'utf8')
  .digest('hex');
  // compute length of entity
  var len = typeof entity === 'string'
    ? Buffer.byteLength(entity, 'utf8')
    : entity.length

  return '"' + len.toString(16) + '-' + hash + '"'
}

console.time('etag')
var etag = entitytag('https://xxx.a.com/react@17.0.2/package.json')
console.timeEnd('etag')


console.time('md5')
const d5 = md5('https://xxx.a.com/react@17.0.2/package.json')
console.timeEnd('md5')

console.log(etag);
console.log(d5);