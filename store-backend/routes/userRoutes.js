
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const protectRoute = require('../middleware/authMiddleware'); //  Secure


router.get('/:userID', protectRoute, async (req, res) => {
  try {
    const user = await User.findOne({ userID: req.params.userID })
      .populate('orderHistory'); //  Important!

    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

//  Get all users (protected route)
router.get("/", protectRoute, async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: "Error fetching users", error: err.message });
    }
  });
//  Secure Save User
router.post('/save', protectRoute, async (req, res) => {
  const { userID, name, email, address, phoneNumber } = req.body;

  if (!userID || !email) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ userID });

    if (existingUser) {
      return res.status(200).json({ message: "User already exists", user: existingUser });
    }

    // Get latest userUID and add +1
    const lastUser = await User.findOne().sort({ userUID: -1 });
    const nextUID = lastUser?.userUID ? lastUser.userUID + 1 : 10000;

    const newUser = new User({
      userID,          // Firebase UID
      userUID: nextUID, // New readable UID
      name,
      email,
      address,
      phoneNumber,
      orderHistory: []
    });

    await newUser.save();
    res.status(201).json({ message: "User saved successfully", user: newUser });

  } catch (error) {
    res.status(500).json({ message: "Error saving user", error: error.message });
  }
});


// Optional: Public route to get users (no protection)
router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});
router.get('/:userID', async (req, res) => {
  try {
    const user = await User.findOne({ userID: req.params.userID }).populate('orderHistory');

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user', error: error.message });
  }
});

router.put('/:userID/update', protectRoute, async (req, res) => {
  const { name, email, address, phoneNumber } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { userID: req.params.userID },
      {
        name,
        email,
        address,
        phoneNumber
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user: updatedUser });

  } catch (err) {
    res.status(500).json({ message: "Error updating user", error: err.message });
  }
});



module.exports = router;
