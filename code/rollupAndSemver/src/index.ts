// @ts-ignore
import * as semver from 'semver';
import * as t from '@babel/types';
import { parse } from '@babel/parser';
// @ts-ignore
import traverse from '@babel/traverse';
// @ts-ignore
import * as template from '@babel/template';
// @ts-ignore
import * as generate from '@babel/generator';

console.log(Buffer.isBuffer);

export default semver;

const ast = parse(
  `
  import a from './x.js';
  console.log(1)
`,
  {
    sourceType: 'module',
  },
);

console.log(ast);
console.log(generate.default(ast));
console.log(generate, t, template);
