const webpack = require('webpack');

exports.devServer = function(options) {
  return {
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      stats: 'errors-only',
      host: options.host,
      port: options.port
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin({
        multiStep: true
      })
    ]
  };
};

exports.setupBabel = function(paths) {
  return {
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loaders: ['babel'],
          include: paths
        }
      ]
    }
  };
};
