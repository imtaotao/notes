function getGlobalEnv() {
  try {
    return require('global-env');
  } catch (e) {
    return null;
  }
}

const user = getGlobalEnv();
console.log(user, 'env');
