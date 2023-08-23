const fs = require('fs');
const path = require('path');
const { RawSource } = require('webpack-sources');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    // trustedTypes: true,
    uniqueName: 'Chentao',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://localhost:1024/dist/',
    library: {
      type: 'umd',
      name: 'TEST_API',
      // umdNamedDefine: true,
    },
  },
  externals: {
    react: {
      amd: 'React',
      root: 'React',
      commonjs: 'React',
      commonjs2: 'React',
    },
    'react-dom': {
      amd: 'ReactDOM',
      root: 'ReactDOM',
      commonjs: 'ReactDOM',
      commonjs2: 'ReactDOM',
    },
    'global-env': {
      amd: 'GlobalEnv',
      root: 'GlobalEnv',
      commonjs: 'GlobalEnv',
      commonjs2: 'GlobalEnv',
    },
  },
  optimization: {
    minimize: false,
    minimizer: [new TerserPlugin({ extractComments: false })],
    realContentHash: true,
    runtimeChunk: {
      name: (e) => `runtime.${e.name}`,
    },
    splitChunks: {
      chunks: 'all',
      minSize: 1,
      cacheGroups: {
        react: {
          name: 'react',
          test: /node_modules\/react/,
          priority: 10,
        },
        reactDOM: {
          name: 'react-dom',
          test: /\/node_modules\/react-dom/,
          priority: 20,
        },
        antd: {
          name: 'antd',
          test: /\/node_modules\/antd/,
          priority: 30,
        },
        a: {
          priority: -10,
          test: /\/a\.js/,
        },
      },
    },
  },
  plugins: [
    // new HtmlWebpackPlugin({ template: './index.html' }),
    function Test(compiler) {
      compiler.hooks.done.tap('test', () => {
        const files = fs.readdirSync('./dist');
        fs.writeFileSync('./dist/manifest.json', JSON.stringify(files));
      });
    },

    function RuntimeChange(compiler) {
      compiler.hooks.compilation.tap('RuntimeChange', (compilation) => {
        compilation.hooks.finishModules.tap('RuntimeChange', () => {
          compilation.hooks.additionalAssets.tap('RuntimeChange', () => {
            for (const entry of compilation.entrypoints.values()) {
              const chunk = entry.getRuntimeChunk();
              const dir = `${chunk.name}.js`;
              if (compilation.assets[dir]) {
                compilation.updateAsset(dir, (old) => {
                  const newCode = old
                    .source()
                    .replace(
                      /.+script\.setAttribute\(['"]data-webpack['"],\s+.+\+.+\);?/,
                      (k1) =>
                        `${k1}script.setAttribute("data-scope", "scope-placeholder");`,
                    );
                  return new RawSource(newCode);
                });
              }
            }
          });
        });
      });
    },
  ],
};
