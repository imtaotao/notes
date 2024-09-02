const mustache = require('mustache');

const template = 'Hello {{name}}!';
const data = { name: 'John' };

const res = mustache.render(template, data); // 'Hello John!'

console.log(res);