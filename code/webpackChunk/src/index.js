import { data } from 'global-env';

import('./a.js').then(({ name }) => {
  console.log('a', name);
});

console.log(data, 'env');

export default {
  name: '11',
};
