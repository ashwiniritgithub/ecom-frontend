// backend/models/Product.js

const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  productID: Number,
  storeID: Number,
  name: String,
  price: Number,
  stock: Number,
  category: String,
  image: String  // image file name or full URL
});

module.exports = mongoose.model('Product', ProductSchema);
