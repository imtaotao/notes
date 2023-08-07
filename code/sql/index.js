const init = require('./utils.js');

// https://www.cnblogs.com/EasonJim/p/7966918.html
// `@` 开头的是局部（用户）变量
// `@@` 开头的是系统（全局和会话变量）变量，会话变量是当前连接中对全局变量的一份 copy
init(async (exec, connection) => {
  await exec('use world;');
  const res = await exec('select char_length("chentao")');
  console.log(res);
});
