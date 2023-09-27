const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    trustedTypes: true,
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd', // 打包为 UMD 格式
    umdNamedDefine: true, // 为 AMD 模块命名
    globalObject: 'this',
  },
  externals: {
    react: 'React',
  },
  optimization: {
    minimize: false,
    runtimeChunk: {
      name: 'runtime.js',
    },
  },
  plugins: [new HtmlWebpackPlugin({ template: './index.html' })],
};
