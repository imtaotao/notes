const init = require('./utils.js');

init(async (exec, connection) => {
  await exec('use world;');
  const res = await exec('show tables;');
  console.log(res);
})