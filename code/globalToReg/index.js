const globToRegExp = require('glob-to-regexp');

const re = globToRegExp('**/node_modules');
console.log(re);
