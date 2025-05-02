// const express = require('express');
// const router = express.Router();
// const Product = require('../models/Product');
// const protectRoute = require('../middleware/authMiddleware'); // adjust the path if needed


// // GET /api/products/:storeID
// // GET /api/products/:storeID
// // routes/productRoutes.js
// // Get products by storeID
// router.get('/', async (req, res) => {
//     try {
//       const products = await Product.find();
//       res.json(products);
//     } catch (err) {
//       res.status(500).json({ error: 'Failed to fetch products' });
//     }
//   });
// router.get('/:storeID', async (req, res) => {
//     try {
//       const storeID = parseInt(req.params.storeID);
//       const products = await Product.find({ storeID: storeID });
//       res.json(products);
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to fetch products' });
//     }
//   });
  
  

// module.exports = router;
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const protectRoute = require('../middleware/authMiddleware');

//  GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

//  GET products by storeID
router.get('/:storeID', async (req, res) => {
  try {
    const storeID = parseInt(req.params.storeID);
    const products = await Product.find({ storeID: storeID });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

//  POST create product
router.post('/', protectRoute, async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product', details: error.message });
  }
});

//  PUT update product
router.put('/:id', protectRoute, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });

    res.json({ message: 'Product updated', product: updatedProduct });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product', details: error.message });
  }
});

// DELETE a product by productID
router.delete('/byProductID/:id', protectRoute, async (req, res) => {
  try {
    const productID = parseInt(req.params.id);
    const deletedProduct = await Product.findOneAndDelete({ productID });

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: '✅ Product deleted successfully' });
  } catch (error) {
    console.error(' Delete Error:', error);
    res.status(500).json({ message: ' Failed to delete product' });
  }
});


module.exports = router;

