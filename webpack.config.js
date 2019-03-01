const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const package = require('./package');

const config = {
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, 'App/index.js'),
  ],
  externals: {
    electron: 'require("electron")',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  output: {
    path: `${__dirname}/public`,
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './index.html',
      title: package.description,
    }),
  ],
  resolve: {
    extensions: ['*', '.js'],
  },
  target: 'node',
};

module.exports = config;
