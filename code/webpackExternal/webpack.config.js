const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    trustedTypes: true,
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://localhost:1024/dist/',
  },
  externals: {
    'global-env': 'GlobalEnv',
  },
  optimization: {
    minimize: false,
    runtimeChunk: {
      name: 'runtime.js',
    },
  },
  plugins: [new HtmlWebpackPlugin({ template: './index.html' })],
};
