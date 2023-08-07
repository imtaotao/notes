define('a', ['globalEnv', 'react'], (env, react) => {
  console.log(react.tt, env.tt);
  env.tt = 123;
  react.tt = 123;
  return {
    data: 'this is a module',
  };
});
