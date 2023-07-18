define('b', ['require',  'a', 'globalEnv'], (req, a, env) => {
  setTimeout(() => {
    // define('test', [], () => `test module ${env.n}`);
    env.setModule('test', `test module ${env.n}`);
    setTimeout(() => {
      req(['c'], (m) => {
        console.log('c', m)
      })
    }, 1000)
  })

  return {
    name: env.name,
    age:  `2${env.n}`
  };
});
