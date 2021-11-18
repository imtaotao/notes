const globToRegExp = require('glob-to-regexp');

const re = globToRegExp('*dist*');
console.log(re);