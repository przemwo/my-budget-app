var path = require('path');

var User = require('../models/user');
var Spendings = require('../models/spendings');

module.exports = function(app, passport) {

  // entry point for app
  app.get('/', function(req, res, next) {
    var msg = req.flash();
    msg.message = msg.message || '';
    msg.error = msg.error || '';
    if(!req.isAuthenticated()) {
      // if user is not looged in show him singup/signin page
      res.render('index.ejs', { message: msg.message, error: msg.error });
    } else {
      // if user is logged in render react app
      res.sendFile(path.join( __dirname, '../../client/src/index.html'));
    }
  });

  // logout the user and redirect to the '/'
  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  // redirect all others .get to the '/'
  app.get('*', function(req, res, next) {
    res.redirect('/');
  });

  // handle sign up functionality
  app.post('/', function(req, res) {
    var username = req.body.email;
    var password = req.body.password;
    User.findOne({ 'local.username': username }, function(err, user) {
      if(err) {
        // some error with DB
        res.send(err);
      } else if(user) {
        // user already exists
        req.flash('error', 'User alredy exists!');
        res.redirect('/');
      } else {
        // save new user to the DB
        var newUser = new User();
        newUser.local.username = username;
        newUser.local.password = newUser.generateHash(password);
        newUser.save(function(err) {
          if(err) throw err;
          req.flash('message', 'Thank you. Email has been sent.');
          res.redirect('/'); // TODO: send confirmation email and redirect
        });
      }
    });
  });

  // try to log in the user
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/',
    failureFlash: true,
    failureFlash: 'Wrong user or password!'
  }));

};
