define('bModule', ['aModule', 'globalEnv'], (a, env) => {
  console.log('b.js', a, env)
  return {
    name: env.name,
    age: env.n + '2',
  };
});
