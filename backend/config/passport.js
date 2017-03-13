var FacebookStrategy = require('passport-facebook').Strategy;

var User = require('../models/user');
var configAuth = require('./auth');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

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
