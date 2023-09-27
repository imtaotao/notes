function getReact() {
  try {
    return require('react');
  } catch (e) {
    return null;
  }
}

console.log('react', getReact());
