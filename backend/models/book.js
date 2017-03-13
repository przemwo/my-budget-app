var mongoose = require('mongoose');

// Book Schema
var bookSchema = mongoose.Schema({
  name: String,
  create_date: {
    type: Date,
    default: Date.now
  }
});

var Book = module.exports = mongoose.model('Book', bookSchema);

// Get Books
module.exports.getBooks = function(callback, limit){
  Book.find(callback).limit(limit);
};
