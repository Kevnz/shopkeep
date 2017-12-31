const path = require('path');
const webpack = require('webpack');

const isDebug = !process.argv.includes('--release');

const PATHS = {
  app: path.join(__dirname, 'src', 'client.js'),
  build: path.join(__dirname, 'dist')
};

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': isDebug ? '"development"' : '"production"',
      'process.env.BROWSER': true,
      __DEV__: isDebug
    })
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 4001,
    host: '0.0.0.0',
    proxy: {
      '/api': 'http://shopkeep.gateway:4567'
    }
  },
  entry: PATHS.app,
  output: {
    path: PATHS.build,
    filename: 'index.js'
  },
  module: {
    loaders: [
      { test: /.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  }
};
