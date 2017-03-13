// Dependencies
var express = require('express');
var router = express.Router();

// Models
var Product = require('../models/product');
var Spendings = require('../models/spendings');
var Categories = require('../models/categories');

// Routes
Product.methods(['get', 'put', 'post', 'delete']);
Product.register(router, '/products');

Spendings.methods(['get', 'put', 'post', 'delete']);
Spendings.register(router, '/spendings');

// Categories.methods(['get', 'put', 'post', 'delete']);
// Categories.register(router, '/categories');
router.get('/categories', function(req, res){
  console.log('auth: ', req.isAuthenticated());
  Categories.getCategories(function(err, categories){
    if(err) {
      throw err;
    } else {
      res.json(categories);
    }
  });
});

router.put('/categories/:id', function(req, res){
  if(!req.isAuthenticated()) {
    res.sendStatus(401);
  }
  var id = req.params.id;
  var category = req.body;
  category.fb_token = req.user.facebook.token;
  console.log(category.fb_token);
  Categories.updateCateogry(id, category, {}, function(err, category){
    if(err) {
      throw err;
    }
    res.json(category);
  });
});


// Return router
module.exports = router;
