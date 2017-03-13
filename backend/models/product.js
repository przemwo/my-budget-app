// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var productsSchema = new mongoose.Schema({
  name: String,
  sku: String,
  price: Number
});

// Return model
module.exports = restful.model('Products', productsSchema);
