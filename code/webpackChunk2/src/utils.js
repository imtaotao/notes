export function getEnv() {
  try {
    return require('global-env');
  } catch (e) {
    return null;
  }
}
