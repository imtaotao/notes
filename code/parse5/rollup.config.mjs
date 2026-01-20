import path from 'node:path';
import json from '@rollup/plugin-json';
import cleanup from 'rollup-plugin-cleanup';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import pkg from './package.json' assert { type: 'json' };

const { dirname: __dirname } = import.meta;

const outputConfigs = {
  umd: {
    format: 'umd',
    file: path.resolve(__dirname, './src/dist/jsdom.umd.js'),
  },
};

const packageConfigs = Object.keys(outputConfigs).map((format) =>
  createConfig(format, outputConfigs[format]),
);

function createConfig(format, output) {
  let nodePlugins = [];
  const isUmdBuild = /umd/.test(format);
  const input = path.resolve(__dirname, './src/index.js');

  output.externalLiveBindings = true;
  if (isUmdBuild) output.name = 'jsdom';

  if (format !== 'cjs') {
    nodePlugins = [
      nodeResolve({ browser: isUmdBuild }),
      commonjs({ sourceMap: false }),
    ];
  }

  return {
    input,
    output,
    external: [],
    plugins: [
      cleanup(),
      json({
        namedExports: false,
      }),
      replace({
        __TEST__: `false`,
        __VERSION__: `'${pkg.version}'`,
        preventAssignment: true,
      }),
      ...nodePlugins,
    ],
  };
}

export default packageConfigs;
