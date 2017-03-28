var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var User = require('../models/user');
var configAuth = require('./auth');

module.exports = function(passport) {

  passport.serializeUser(function(user, cb) {
    cb(null, user.id);
  });

  passport.deserializeUser(function(id, cb) {
    User.findById(id, function(err, user) {
      if(err) { return cb(err); }
      cb(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'passwd',
      passReqToCallback: true
    },
    function(req, username, password, cb) {
      console.log(req);
      User.findOne({ 'local.username': username }, function(err, user) {
        if(err) { return cb(err); }
        if(user) { return cb(null, false); }
        var newUser = new User();
        newUser.local.username = username;
        newUser.local.password = password;
        newUser.save(function(err) {
          if(err) throw err;
          return cb(null, newUser);
        });
      });
    }
  ));




  passport.use(new FacebookStrategy({
      clientID: configAuth.facebookAuth.clientId,
      clientSecret: configAuth.facebookAuth.clientSecret,
      callbackURL: configAuth.facebookAuth.callbackURL
    },
    function(accessToken, refreshToken, profile, cb) {
      process.nextTick(function() {
        User.findOne({'facebook.id': profile.id}, function(err, user){
          if(err) {
            console.log('errror!!!!!!!!!!!!!!!!!!');
            return cb(err);
          }
          if(user) {
            console.log('user!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
            console.log(1);
            console.log(user);
            console.log(2);
            return cb(null, user);
          } else {
            console.log('else!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
            console.log(profile);
            var newUser = new User();
            newUser.facebook.id = profile.id;
            newUser.facebook.token = accessToken;
            newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
            newUser.save(function(err){
              if(err) {
                throw err;
              }
              return cb(null, newUser);
            });
          }
        });
      })
    }
  ));
};
