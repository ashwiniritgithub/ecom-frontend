const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// Add Review
//  Get all reviews by a user
router.get('/user/:userID', async (req, res) => {
  try {
    const reviews = await Review.find({ userID: req.params.userID });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user reviews' });
  }
});

// router.post('/add', async (req, res) => {
//   try {
//     const { reviewID, userID, storeID, rating, comment } = req.body;

//     const newReview = new Review({ reviewID, userID, storeID, rating, comment });
//     await newReview.save();

//     res.status(201).json({ message: 'Review saved successfully' });
//   } catch (err) {
//     console.error('Error saving review:', err);
//     res.status(500).json({ message: 'Failed to save review' });
//   }
// });
router.post('/add', async (req, res) => {
  try {
    const { reviewID, userID, storeID, orderID, rating, comment } = req.body;

    const newReview = new Review({
      reviewID,
      userID,
      storeID,
      orderID, //  Save the order ID
      rating,
      comment
    });

    await newReview.save();
    res.status(201).json({ message: 'Review saved successfully' });
  } catch (err) {
    console.error('Error saving review:', err);
    res.status(500).json({ message: 'Failed to save review' });
  }
});

// (Optional) Get Reviews for a Store
router.get('/store/:storeID', async (req, res) => {
  try {
    const reviews = await Review.find({ storeID: req.params.storeID });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reviews' });
  }
});

module.exports = router;
