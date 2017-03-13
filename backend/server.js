import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);
const env = process.env.NODE_ENV || 'development';

if(env === 'production') {
  // PRODUCTION SETUP
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
} else {
  // DEVELOPMENT SETUP
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));

  app.get('*', function(req, res) {
    res.sendFile(path.join( __dirname, '../client/src/index.html'));
  });
}


app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is running on http://localhost:${port}`);
  }
});
