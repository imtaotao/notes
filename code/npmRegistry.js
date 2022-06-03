const { spawnSync } = require('child_process');

const res = spawnSync('npm', ['config', 'get', 'registry']);
console.log(res.output[1].toString().trim());
