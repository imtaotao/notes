define('c', ['test', 'globalEnv'], (test, globalEnv) => {
  return {
    c: `c - ${test} - ${globalEnv.n}`,
  };
});
