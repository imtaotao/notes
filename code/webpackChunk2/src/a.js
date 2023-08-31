import React from 'react';
console.log('react', React);

// import { data } from 'global-env';
// export const name = `chentao-${data}`;

import { getEnv } from './utils';
export const name = `chentao-${getEnv().data}`;
