

// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema({
//   orderID: Number,
//   userID: String,
//   storeID: Number,
//   itemList: [
//     {
//       productID: Number,
//       name: String,
//       quantity: Number,
//       price: Number,
//       image: String,
//     }
//   ],
//   totalPrice: Number,
//   status: String,
//   deliveryAddress: String,
//   billingAddress: String,
//   paymentMethod: String,
// }, {
//   timestamps: true // ✅ Adds createdAt and updatedAt
// });

// module.exports = mongoose.model("Order", orderSchema);

const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  orderID: Number,
  userID: String,       // Firebase UID
  userUID: Number,      // Internal readable UID 
  storeID: Number,
  itemList: [
        {
          productID: Number,
          name: String,
          quantity: Number,
          price: Number,
          image: String,
        }
      ],
  totalPrice: Number,
  status: String,
  deliveryAddress: String,
  billingAddress: String,
  paymentMethod: String
}, {
  timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);
