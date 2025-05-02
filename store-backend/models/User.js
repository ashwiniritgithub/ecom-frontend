
 
 
// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   userID: String,
//   name: String,
//   email: String,
//   address: String,
//   phoneNumber: String,
//   orderHistory: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Order'
//   }]
// });

// module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userID: String,  // Firebase UID
  userUID: {
    type: Number,
    unique: true,
    required: true
  },
  
  name: String,
  email: String,
  address: String,
  phoneNumber: String,
  orderHistory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  }]
});

module.exports = mongoose.model('User', userSchema);
