const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const protectRoute = require('../middleware/authMiddleware');


//  Get Cart for a User
router.get("/:userID", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userID: req.params.userID });
    if (!cart) return res.status(200).json({ items: [] });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: "Failed to get cart" });
  }
});

//  Add Item to Cart
router.post("/:userID", async (req, res) => {
  const { productID, name, image, price, quantity } = req.body;
  const userID = req.params.userID;

  try {
    let cart = await Cart.findOne({ userID });

    if (!cart) {
      cart = new Cart({
        userID,
        items: [{ productID, name, image, price, quantity }]
      });
    } else {
      const index = cart.items.findIndex(item => item.productID === productID);
      if (index !== -1) {
        cart.items[index].quantity += quantity;
      } else {
        cart.items.push({ productID, name, image, price, quantity });
      }
    }

    await cart.save();
    res.json({ message: "Cart updated", cart });
  } catch (err) {
    res.status(500).json({ error: "Failed to update cart" });
  }
});

// PUT /api/cart/:userID   This must exist
router.put('/:userID', protectRoute, async (req, res) => {
  const { productID, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userID: req.params.userID });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(i => i.productID === productID);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.quantity = quantity;
    await cart.save();

    res.status(200).json({ message: "Quantity updated", cart });
  } catch (err) {
    console.error("Error updating quantity:", err);
    res.status(500).json({ error: "Failed to update quantity" });
  }
});


//  Delete Item
router.delete("/:userID/:productID", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userID: req.params.userID });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(item => item.productID != req.params.productID);
    await cart.save();
    res.json({ message: "Item removed", cart });
  } catch (err) {
    res.status(500).json({ error: "Error deleting item" });
  }
});
//  Clear the entire cart after placing an order
router.delete("/:userID", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userID: req.params.userID });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = []; // clear the items
    await cart.save();

    res.json({ message: "Cart cleared after order", cart });
  } catch (err) {
    res.status(500).json({ error: "Failed to clear cart" });
  }
});

module.exports = router;
