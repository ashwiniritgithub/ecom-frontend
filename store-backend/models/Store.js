// // const mongoose = require('mongoose');

// // const StoreSchema = new mongoose.Schema({
//     storeID: { type: Number, unique: true, required: true },
// //   name: String,
// //   category: String,
// //   deliveryTime: String,
// //   rating: Number,
// //   reviews: Number,
// //   logo: String
// // });

// // module.exports = mongoose.model('Store', StoreSchema);
// const mongoose = require('mongoose');

// const StoreSchema = new mongoose.Schema({
//   storeID: { type: Number, unique: true, required: true },
//   name: { type: String, required: true },
//   ownerID: { type: Number, required: true },
//   location: { type: String, required: true },
//   productList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
//   rating: { type: Number, default: 0 },
//   imageUrl: { type: String, required: true }
// });

// module.exports = mongoose.model('Store', StoreSchema);
// const mongoose = require("mongoose");

// const StoreSchema = new mongoose.Schema({
//   storeID: { type: Number, required: true, unique: true },
//   name: { type: String, required: true },
//   ownerID: { type: Number, required: true },
//   location: { type: String, required: true },
//   productList: { type: Array, default: [] },
//   rating: { type: Number, default: 0 },
// });

// module.exports = mongoose.model("Store", StoreSchema);

const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  storeID: Number,
  name: String,
  location: String,
  ownerID: Number,
  rating: Number,
  image: String
});

module.exports = mongoose.model('Store', storeSchema);
