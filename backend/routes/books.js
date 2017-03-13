var express = require('express');
var router = express.Router();
var Books = require('../models/book');
var User = require('../models/user');

router.get('/test', function(req, res){
  if(req.isAuthenticated()) {
    User.getUsers(function(err, users){
      if(err) {
        throw err;
      }
      res.json(users);
    })
  } else {
    res.sendStatus(401);
  }
});

router.get('/test/:id', function(req, res){
  User.getUserById(req.params.id, function(err, user){
    if(err) {
      throw err;
    }
    res.json(user);
  });
});

router.post('/test', function(req, res){
  var user = req.body;
  User.addUser(user, function(err, user){
    if(err) {
      throw err;
    }
    res.json(user);
  });
});

router.put('/test/:id', function(req, res){
  var id = req.params.id;
  var user = req.body;
  User.updateUser(id, user, {}, function(err, user){
    if(err) {
      throw err;
    }
    res.json(user);
  });
});

module.exports = router;
