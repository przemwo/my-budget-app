var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  local: {
    username: String,
    password: String
  },
  facebook: {
    id: String,
    token: String,
    name: String
  }
});

var User = module.exports = mongoose.model('User', userSchema);

// Get Users
module.exports.getUsers = function(callback, limit){
  User.find(callback).limit(limit);
};

// Get User by ID
module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
};

//  Add User
module.exports.addUser = function(user, callback){
  User.create(user, callback);
};

//  Update User
module.exports.updateUser = function(id, user, options, callback){
  var query = { _id: id};
  var update = {
    'facebook.id': user.facebook.id,
    'facebook.token': user.facebook.token,
    'facebook.name': user.facebook.name
  }
  User.findOneAndUpdate(query, update, options, callback);
};
