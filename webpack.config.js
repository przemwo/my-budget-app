const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // make .html file
const merge = require('webpack-merge'); // merge objects into one
const validate = require('webpack-validator'); // watch if webpack config is ok

const parts = require('./libs/parts');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

const common = {
  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.template.ejs',
      inject: 'body'
    })
  ]
};

var config;

switch (process.env.npm_lifecycle_event) {
  case 'build':
    config = merge(
      common,
      parts.setupBabel(PATHS.app)
    );
    break;
  default:
    config = merge(
      common,
      parts.setupBabel(PATHS.app),
      parts.devServer({
        host: process.env.HOST,
        port: process.env.PORT
      })
    );
}

module.exports = validate(config);
