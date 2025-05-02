// const mongoose = require('mongoose');

// const reviewSchema = new mongoose.Schema({
//   reviewID: { type: Number, required: true, unique: true },
//   userID: { type: String, required: true },
//   storeID: { type: Number, required: true },
//   orderID: { type: Number, required: true }, // 
//   rating: { type: Number, required: true },
//   comment: { type: String, required: true }
// });


// module.exports = mongoose.model('Review', reviewSchema);
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  reviewID: { type: Number, required: true, unique: true },
  userID: { type: String, required: true },
  storeID: { type: Number, required: true },
  orderID: { type: Number, required: true }, //  Add this
  rating: { type: Number, required: true },
  comment: { type: String, required: true }
});

module.exports = mongoose.model('Review', reviewSchema);
