define('a', [], () => {
  console.warn('exec a module');
  return {
    data: 'this is a module',
    user: {
      age: 23,
      name: 'chentao',
    },
  };
});
