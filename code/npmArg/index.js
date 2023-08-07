const npa = require('npm-package-arg');

parsed = npa('@bar/foo@workspace:*');
console.log(parsed);
