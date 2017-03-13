var User = require('../models/user');
var Spendings = require('../models/spendings');

module.exports = function(app, passport) {
  app.get('/tmp', function(req, res, next){
    var foo = req.isAuthenticated();
    res.json({'auth': foo});
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

  // app.get('/:id?', function(req, res) {
  //   var newUser = new User();
  //   console.log(newUser);
  //   console.log(req.params);
  //   res.send('Params!');
  // });

  app.get('/login', function(req, res){
    res.redirect('/auth/facebook');
  });

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  app.get('/auth/facebook', passport.authenticate('facebook'));

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      failureRedirect: '/login',
      // session: false
    }),
    function(req, res) {
      res.redirect('/');
  });
};


function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
    console.log('yes');
		return next();
	}
  console.log('no');
	res.redirect('/login');
}
