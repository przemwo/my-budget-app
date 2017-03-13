// Dependencies
// var restful = require('node-restful');
// var mongoose = restful.mongoose;
var mongoose = require('mongoose');

// Schema
var categoriesSchema = mongoose.Schema({
  name: String,
  status: String,
  favourite: Boolean,
  fb_token: String
});

// Return model
var Categories = module.exports = mongoose.model('Categories', categoriesSchema);

// Get categories
module.exports.getCategories = function(callback, limit){
  console.log('getCategories');
  Categories.find(callback).limit(limit);
};

// Update category
module.exports.updateCateogry = function(id, category, options, callback){
  console.log('updateCateogry');
  var query = { _id: id};
  var update = {
    'name': category.name,
    'status': category.status,
    'favourite': category.favourite,
    'fb_token': category.fb_token
  }
  Categories.findOneAndUpdate(query, update, options, callback);
};

module.exports.addCategory = function(category, callback){
  console.log(333);
  callback();
  // Categories.create(category, callback);
};
