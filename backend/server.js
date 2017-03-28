import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../client/webpack.config.dev';

var mongoose = require('mongoose');
var configDB = require('./config/database.js');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

var port = process.env.PORT || 3003;
var env = process.env.NODE_ENV || 'development';

// MongoDB
mongoose.connect(configDB.url);

// Passport
require('./config/passport')(passport);

// Express
var app = express();
app.use(cookieParser());
app.use(session({
  secret: 'somestring',
  saveUninitialized: true,
  resave: true,
  cookie: {maxAge: 60000} // 1min
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.set('views', path.join(__dirname, '/views')); // sets dir for ejs views
app.set('view engine', 'ejs');

const compiler = webpack(config);
if(env === 'production') {
  // PRODUCTION SETUP
  app.use(express.static(path.join(__dirname, '../client/dist')));
  // app.get('*', function(req, res) {
  //   if(!req.isAuthenticated()) {
  //     res.redirect('/home');
  //   } else {
  //     res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  //   }
  // });
} else {
  // DEVELOPMENT SETUP
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler));
  // app.get('*', function(req, res) {
  //   console.log(0);
  //   if(!req.isAuthenticated()) {
  //     console.log(3333333);
  //     res.redirect('/home');
  //   } else {
  //     console.log(1);
  //     res.sendFile(path.join( __dirname, '../client/src/index.html'));
  //     console.log(2);
  //   }
  // });
}

// Routes
app.use('/api', require('./routes/api'));

app.use('/books', require('./routes/books'));

require('./routes/routes.js')(app, passport);

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is running on http://localhost:${port}`);
  }
});
