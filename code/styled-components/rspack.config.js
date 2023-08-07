module.exports = {
  mode: process.env.NODE_ENV,
  target: ['web'],
  context: __dirname,
  entry: {
    main: './src/index.tsx',
  },
  devServer: {
    port: 1024,
    historyApiFallback: true,
    client: {
      overlay: false,
    },
  },
  builtins: {
    html: [
      {
        template: './index.html',
      },
    ],
    define: {
      SC_DISABLE_SPEEDY: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        type: 'jsx',
      },
      {
        test: /\.ts$/,
        type: 'tsx',
      },
    ],
  },
};
