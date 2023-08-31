// import { data } from 'global-env';
// console.log(data, 'env');

import { getEnv } from './utils';
console.log(getEnv().data, 'env');

import('./a.js').then(({ name }) => {
  console.log('a', name);
});

export default {
  name: '11',
};
