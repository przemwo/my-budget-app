// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var spendingsSchema = new mongoose.Schema({
  timestamp: Number,
  year: Number,
  month: Number,
  day: Number,
  amount: Number,
  category: String,
  description: String,
  status: String
});

// Return model
module.exports = restful.model('Spendings', spendingsSchema);
