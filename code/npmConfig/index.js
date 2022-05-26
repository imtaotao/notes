const path = require('path');
const Config = require('@npmcli/config');
const { definitions, flatten, shorthands } = require('npm/lib/utils/config/index.js');

const conf = new Config({
  npmPath: path.dirname(__dirname),
  definitions,
  // flatten,
  // shorthands,
})

conf.load().then(() => {
  console.log(conf.get('registry'));
})
