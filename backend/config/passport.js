var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');
var configAuth = require('./auth');

module.exports = function(passport) {

  passport.serializeUser(function(user, cb) {
    cb(null, user.id);
  });

  passport.deserializeUser(function(id, cb) {
    User.findById(id, function(err, user) {
      if(err) { return cb(err); }
      console.log('deserializeUser');
      cb(err, user);
    });
  });

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
    },
    function(req,username, password, cb) {
      User.findOne({ 'local.username': username }, function(err, user) {
        if(err) {
          return cb(err);
        }
        if(!user || user.local.password !== password) {
          return cb(null, false);
        }
        return cb(null, user);
      });
    }
  ));

};
