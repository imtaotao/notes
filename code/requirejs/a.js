define('aModule', ['globalEnv', 'react'], (env, react) => {
  console.log('a.js', env)
  console.log(react.tt, env.tt)
  react.tt = 123;
  env.tt = 456;
  return {
    data: 'this is a module'
  };
});
