const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
  productID: Number,
  name: String,
  image: String,
  price: Number,
  quantity: Number,
  
});

const CartSchema = new mongoose.Schema({
  userID: {
    type: String,  // Firebase UID
    required: true,
    unique: true
  },
  items: [CartItemSchema]
});

module.exports = mongoose.model("Cart", CartSchema);
