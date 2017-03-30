var mongoose = require('mongoose');

var bcrypt = require('bcrypt');
var saltRounds = 13;
var salt = bcrypt.genSaltSync(saltRounds);

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
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, salt);
};
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};


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
