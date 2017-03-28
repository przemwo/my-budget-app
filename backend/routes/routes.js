import path from 'path';

var User = require('../models/user');
var Spendings = require('../models/spendings');

module.exports = function(app, passport) {

  app.post('/home', function(req, res) {
    var username = req.body.email;
    var password = req.body.password;
    User.findOne({ 'local.username': username }, function(err, user) {
      if(err) {
        res.send(err);
      } else if(user) {
        res.render('index.ejs', { message: 'User already exists' });
      } else {
        var newUser = new User();
        newUser.local.username = username;
        newUser.local.password = password;
        newUser.save(function(err) {
          if(err) throw err;
          res.redirect('/'); // TODO: send confirmation email and redirect
        });
      }
    });
  });

  app.get('/home', function (req, res) {
    res.render('index.ejs', { message: '' });
  });

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/home'
  }));

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  app.get('/', function(req, res, next) {
    if(!req.isAuthenticated()) {
      res.render('index.ejs', { message: '' });
      console.log(777);
    } else {
      console.log(444);
      res.sendFile(path.join( __dirname, '../../client/src/index.html'));
      console.log(555);
    }
    console.log(888);
  });

  app.get('*', function(req, res, next) {
    console.log(666);
    res.redirect('/');
  });

};

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
    console.log('user is auth');
		return next();
	}
  console.log('user is not auth');
	res.redirect('/login');
}
