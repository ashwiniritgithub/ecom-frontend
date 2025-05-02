


const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product')
const protectRoute = require('../middleware/authMiddleware');

// const protectRoute = require('../middleware/authMiddleware');
//  GET latest order by userID
router.get('/:userID', protectRoute, async (req, res) => {

  const orders = await Order.find({ userID: req.params.userID });
  res.json(orders);
});


// // ✅ POST - Always create a new order
// router.post('/', async (req, res) => {
//   const {
//     userID,
//     itemList,
//     totalPrice,
//     status,
//     deliveryAddress,
//     billingAddress,
//     paymentMethod,
//     storeID
//   } = req.body;

//   try {
//     const orderID = Math.floor(Math.random() * 1000000);

//     const newOrder = new Order({
//       userID,
//       orderID,
//       itemList,
//       totalPrice,
//       status,
//       deliveryAddress,
//       billingAddress,
//       paymentMethod,
//       storeID,
//     });

//     const savedOrder = await newOrder.save();
//     console.log("✅ Order saved:", savedOrder);

//     res.status(201).json({ message: '✅ Order placed', order: savedOrder });
//   } catch (err) {
//     console.error("❌ Error saving order:", err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });
// router.post('/', async (req, res) => {
//   const {
//     userID,
//     itemList,
//     totalPrice,
//     status,
//     deliveryAddress,
//     billingAddress,
//     paymentMethod,
//     storeID
//   } = req.body;

//   try {
//     const orderID = Math.floor(Math.random() * 1000000);

//     const newOrder = new Order({
//       userID,
//       orderID,
//       itemList,
//       totalPrice,
//       status,
//       deliveryAddress,
//       billingAddress,
//       paymentMethod,
//       storeID,
//     });

//     const savedOrder = await newOrder.save();

//     // ✅ Update user's orderHistory
//     await User.findOneAndUpdate(
//       { userID },
//       { $push: { orderHistory: savedOrder._id } },
//       { new: true }
//     );

//     res.status(201).json({ message: '✅ Order placed', order: savedOrder });
//   } catch (err) {
//     console.error("❌ Error saving order:", err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// router.post('/', async (req, res) => {
//   const {
//     userID,         // comes from frontend
//     itemList,
//     totalPrice,
//     status,
//     deliveryAddress,
//     billingAddress,
//     paymentMethod,
//     storeID
//   } = req.body;

//   try {
//     //  Get userUID from User model
//     const user = await User.findOne({ userID });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const userUID = user.userUID;

//     const orderID = Math.floor(Math.random() * 1000000); // or your own logic

//     const newOrder = new Order({
//       userID,
//       userUID,     //  Save readable ID
//       storeID,
//       itemList,
//       totalPrice,
//       status,
//       deliveryAddress,
//       billingAddress,
//       paymentMethod,
//       orderID
//     });

//     const savedOrder = await newOrder.save();
//     res.status(201).json({ message: '✅ Order placed', order: savedOrder });

//   } catch (error) {
//     console.error(' Error saving order:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });



// router.post('/', protectRoute, async (req, res) => {

//   const {
//     userID,         // comes from frontend
//     itemList,
//     totalPrice,
//     status,
//     deliveryAddress,
//     billingAddress,
//     paymentMethod,
//     storeID
//   } = req.body;

//   try {
//     //  Get userUID from User model
//     const user = await User.findOne({ userID });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const userUID = user.userUID;

//     const orderID = Math.floor(Math.random() * 1000000); // or your own logic

//     const newOrder = new Order({
//       userID,
//       userUID,     //  Save readable ID
//       userName: user.name,
//       userEmail: user.email,
//       storeID,
//       itemList,
//       totalPrice,
//       status,
//       deliveryAddress,
//       billingAddress,
//       paymentMethod,
//       orderID
//     });

//     const savedOrder = await newOrder.save();

//     //  Link order to user's orderHistory
//     await User.findOneAndUpdate(
//       { userID },
//       { $push: { orderHistory: savedOrder._id } },
//       { new: true }
//     );

//     res.status(201).json({ message: '✅ Order placed', order: savedOrder });

//   } catch (error) {
//     console.error(' Error saving order:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });



router.post('/', protectRoute, async (req, res) => {
  const {
    userID,
    itemList,
    totalPrice,
    status,
    deliveryAddress,
    billingAddress,
    paymentMethod
  } = req.body;

  try {
    // ✅ 1. Find the user
    const user = await User.findOne({ userID });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const userUID = user.userUID;

    // ✅ 2. Fetch storeID from Product DB using first productID
    const firstProductID = itemList[0]?.productID;
    const product = await Product.findOne({ productID: firstProductID });

    if (!product || !product.storeID) {
      return res.status(400).json({ message: "Store ID could not be determined from product." });
    }

    const storeID = product.storeID;
    console.log("✅ storeID from Product DB:", storeID);

    const orderID = Math.floor(Math.random() * 1000000);

    // ✅ 3. Create and save order
    const newOrder = new Order({
      userID,
      userUID,
      userName: user.name,
      userEmail: user.email,
      storeID,
      itemList,
      totalPrice,
      status,
      deliveryAddress,
      billingAddress,
      paymentMethod,
      orderID
    });

    const savedOrder = await newOrder.save();

    // ✅ 4. Push order to user's orderHistory
    await User.findOneAndUpdate(
      { userID },
      { $push: { orderHistory: savedOrder._id } },
      { new: true }
    );

    res.status(201).json({ message: '✅ Order placed', order: savedOrder });

  } catch (error) {
    console.error('❌ Error saving order:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
//  GET orders for a specific user
router.get('/:userID', async (req, res) => {
  try {
    const { userID } = req.params;
    const orders = await Order.find({ userID });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

    res.json(orders);
  } catch (error) {
    console.error(' Error fetching orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

//  GET all orders for user
router.get('/user/:userID', async (req, res) => {
  try {
    const orders = await Order.find({ userID: req.params.userID });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: " Fetch failed", error: error.message });
  }
});

//  PUT: Update order status
router.put('/:orderID/status', protectRoute, async (req, res) => {

  try {
    const updated = await Order.findOneAndUpdate(
      { orderID: parseInt(req.params.orderID) },
      { status: req.body.status },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: " Update failed", error: error.message });
  }
});

//  DELETE: Cancel an order
router.delete('/:orderID', protectRoute, async (req, res) => {

  try {
    await Order.findOneAndDelete({ orderID: parseInt(req.params.orderID) });
    res.json({ message: "🗑️ Order canceled" });
  } catch (error) {
    res.status(500).json({ message: " Cancel failed", error: error.message });
  }
});

module.exports = router;


