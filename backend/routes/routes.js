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
        res.render(path.join(__dirname, '../views/index.ejs'), { message: 'User already exists' });
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
    res.render(path.join(__dirname, '../views/index.ejs'), { message: '' });
  });

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/home'
  }));

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });




  app.get('/profile', isLoggedIn, function(req, res){
    var result;
      process.nextTick(function() {
        console.log("===============================");
        console.log('user: ', req.user);
        console.log('userId:', req.user.facebook.id);
        console.log("===============================");
        User.find({'facebook.id': req.user.facebook.id}, function(err, user) {
          console.log('ERR: ', err);
          console.log('USER: ', user);
        });
        User.find({'facebook.id': '1340010649389545'}, function(err, user){
          console.log('err2: ', err);
          console.log('user2: ', user);
        });
        console.log("==============================");
        Spendings.find({'status': 'deleted'}, function(err, spendings){
          console.log('err3: ', err);
          console.log('spendings: ', spendings);
          result = ['test', 'a co'];
        });
        console.log("==============================");
        // res.send('Profile!');
        console.log('result: ', result);
        res.json(result);
      });
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
