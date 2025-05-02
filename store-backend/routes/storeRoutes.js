// // // const express = require('express');
// // // const Store = require('../models/Store');
// // // const router = express.Router();

// // // // ✅ GET All Stores
// // // router.get('/', async (req, res) => {
// // //   try {
// // //     const stores = await Store.find();
// // //     res.json(stores);
// // //   } catch (err) {
// // //     res.status(500).json({ message: err.message });
// // //   }
// // // });

// // // // ✅ ADD a New Store
// // // router.post('/', async (req, res) => {
// // //   const newStore = new Store(req.body);
// // //   try {
// // //     const savedStore = await newStore.save();
// // //     res.status(201).json(savedStore);
// // //   } catch (err) {
// // //     res.status(400).json({ message: err.message });
// // //   }
// // // });

// // // module.exports = router;
// // const express = require('express');
// // const Store = require('../models/Store');

// // const router = express.Router();

// // // ✅ Get all stores
// // router.get('/', async (req, res) => {
// //   try {
// //     const stores = await Store.find().populate('productList');
// //     res.json(stores);
// //   } catch (error) {
// //     res.status(500).json({ message: 'Failed to fetch stores', error });
// //   }
// // });

// // // ✅ Get a single store by ID
// // router.get('/:id', async (req, res) => {
// //   try {
// //     const store = await Store.findById(req.params.id).populate('productList');
// //     if (!store) return res.status(404).json({ message: 'Store not found' });
// //     res.json(store);
// //   } catch (error) {
// //     res.status(500).json({ message: 'Error fetching store', error });
// //   }
// // });

// // // ✅ Create a new store
// // router.post('/', async (req, res) => {
// //   try {
// //     const newStore = new Store(req.body);
// //     await newStore.save();
// //     res.status(201).json(newStore);
// //   } catch (error) {
// //     res.status(500).json({ message: 'Error creating store', error });
// //   }
// // });

// // // ✅ Update a store
// // router.put('/:id', async (req, res) => {
// //   try {
// //     const updatedStore = await Store.findByIdAndUpdate(req.params.id, req.body, { new: true });
// //     res.json(updatedStore);
// //   } catch (error) {
// //     res.status(500).json({ message: 'Error updating store', error });
// //   }
// // });

// // // ✅ Delete a store
// // router.delete('/:id', async (req, res) => {
// //   try {
// //     await Store.findByIdAndDelete(req.params.id);
// //     res.json({ message: 'Store deleted successfully' });
// //   } catch (error) {
// //     res.status(500).json({ message: 'Error deleting store', error });
// //   }
// // });

// // module.exports = router;
// const express = require("express");
// const Store = require("../models/Store");  // Ensure correct path


// const router = express.Router();

// // Create a new store
// router.post("/", async (req, res) => {
//   try {
//     const newStore = new Store(req.body);
//     await newStore.save();
//     res.status(201).json(newStore);
//   } catch (error) {
//     res.status(500).json({ message: "Error creating store", error });
//   }
// });

// // Get all stores
// router.get("/", async (req, res) => {
//   try {
//     const stores = await Store.find();
//     res.status(200).json(stores);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching stores", error });
//   }
// });

// // Get a single store by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const store = await Store.findOne({ storeID: req.params.id });
//     if (!store) return res.status(404).json({ message: "Store not found" });
//     res.status(200).json(store);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching store", error });
//   }
// });

// // Update a store
// router.put("/:id", async (req, res) => {
//   try {
//     const updatedStore = await Store.findOneAndUpdate(
//       { storeID: req.params.id },
//       req.body,
//       { new: true }
//     );
//     res.status(200).json(updatedStore);
//   } catch (error) {
//     res.status(500).json({ message: "Error updating store", error });
//   }
// });

// // Delete a store
// router.delete("/:id", async (req, res) => {
//   try {
//     await Store.findOneAndDelete({ storeID: req.params.id });
//     res.status(200).json({ message: "Store deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting store", error });
//   }
// });

// module.exports = router;
// const express = require("express");
// const Store = require("../models/Store"); // Ensure correct model path
// const router = express.Router();

// // ✅ Create a new store
// router.post("/", async (req, res) => {
//   try {
//     const { storeID, name, location, rating, image } = req.body;

//     if (!storeID || !name || !location || !rating || !image) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const newStore = new Store(req.body);
//     await newStore.save();
//     res.status(201).json({ message: "Store created successfully", store: newStore });
//   } catch (error) {
//     console.error("Error creating store:", error);
//     res.status(500).json({ message: "Error creating store", error: error.message });
//   }
// });

// // ✅ Get all stores
// router.get("/", async (req, res) => {
//     try {
//       const stores = await Store.find();
//       console.log("Stores from DB:", stores);  // 👈 Debugging Log
  
//       if (!stores || stores.length === 0) {
//         return res.status(404).json({ message: "No stores found" });
//       }
//       res.status(200).json(stores);
//     } catch (error) {
//       console.error("Error fetching stores:", error);  // 👈 Debugging Log
//       res.status(500).json({ message: "Error fetching stores", error });
//     }
//   });
  
  

// // ✅ Get a single store by storeID
// // router.get("/:id", async (req, res) => {
// //   try {
// //     const store = await Store.findOne({ storeID: parseInt(req.params.id) });

// //     if (!store) return res.status(404).json({ message: "Store not found" });

// //     res.status(200).json(store);
// //   } catch (error) {
// //     console.error("Error fetching store:", error);
// //     res.status(500).json({ message: "Error fetching store", error: error.message });
// //   }
// // });
// // // Get store by its Mongo _id (used by frontend)
// // router.get('/:id', async (req, res) => {
// //   try {
// //     // const store = await Store.findById(req.params.id); // MongoDB _id
// //     const store = await Store.findById(req.params.id); // ✅ Use Mongo _id

// //     if (!store) {
// //       return res.status(404).json({ message: 'Store not found' });
// //     }
// //     res.json(store); // returns full store object including storeID
// //   } catch (error) {
// //     console.error("❌ Store fetch error:", error);
// //     res.status(500).json({ error: "Internal Server Error" });
// //   }
// // });
// // Get store by MongoDB ObjectId
// router.get('/:id', async (req, res) => {
//   try {
//     const store = await Store.findById(req.params.id); // ✅ Must use findById
//     if (!store) return res.status(404).json({ message: "Store not found" });
//     res.status(200).json(store);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching store", error });
//   }
// });



// // ✅ Update a store by storeID
// router.put("/:id", async (req, res) => {
//   try {
//     const updatedStore = await Store.findOneAndUpdate(
//       { storeID: parseInt(req.params.id) },
//       req.body,
//       { new: true, runValidators: true }
//     );

//     if (!updatedStore) return res.status(404).json({ message: "Store not found" });

//     res.status(200).json({ message: "Store updated successfully", store: updatedStore });
//   } catch (error) {
//     console.error("Error updating store:", error);
//     res.status(500).json({ message: "Error updating store", error: error.message });
//   }
// });

// // ✅ Delete a store by storeID
// router.delete("/:id", async (req, res) => {
//   try {
//     const deletedStore = await Store.findOneAndDelete({ storeID: parseInt(req.params.id) });

//     if (!deletedStore) return res.status(404).json({ message: "Store not found" });

//     res.status(200).json({ message: "Store deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting store:", error);
//     res.status(500).json({ message: "Error deleting store", error: error.message });
//   }
// });

// module.exports = router;
const express = require("express");
const Store = require("../models/Store");
const protectRoute = require("../middleware/authMiddleware");
const router = express.Router();

//  Create a new store — PROTECTED
router.post("/", protectRoute, async (req, res) => {
  try {
    const { storeID, name, location, rating, image } = req.body;

    if (!storeID || !name || !location || !rating || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newStore = new Store(req.body);
    await newStore.save();
    res.status(201).json({ message: "Store created successfully", store: newStore });
  } catch (error) {
    console.error("Error creating store:", error);
    res.status(500).json({ message: "Error creating store", error: error.message });
  }
});

//  Get all stores — PUBLIC
router.get("/", async (req, res) => {
  try {
    const stores = await Store.find();
    if (!stores || stores.length === 0) {
      return res.status(404).json({ message: "No stores found" });
    }
    res.status(200).json(stores);
  } catch (error) {
    console.error("Error fetching stores:", error);
    res.status(500).json({ message: "Error fetching stores", error });
  }
});

//  Get store by Mongo ObjectId — PUBLIC
router.get('/:id', async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);
    if (!store) return res.status(404).json({ message: "Store not found" });
    res.status(200).json(store);
  } catch (error) {
    res.status(500).json({ message: "Error fetching store", error });
  }
});

//  Update a store by storeID — PROTECTED
router.put("/:id", protectRoute, async (req, res) => {
  try {
    const updatedStore = await Store.findOneAndUpdate(
      { storeID: parseInt(req.params.id) },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedStore) return res.status(404).json({ message: "Store not found" });
    res.status(200).json({ message: "Store updated successfully", store: updatedStore });
  } catch (error) {
    console.error("Error updating store:", error);
    res.status(500).json({ message: "Error updating store", error: error.message });
  }
});

//  Delete a store by storeID — PROTECTED
router.delete("/:id", protectRoute, async (req, res) => {
  try {
    const deletedStore = await Store.findOneAndDelete({ storeID: parseInt(req.params.id) });
    if (!deletedStore) return res.status(404).json({ message: "Store not found" });
    res.status(200).json({ message: "Store deleted successfully" });
  } catch (error) {
    console.error("Error deleting store:", error);
    res.status(500).json({ message: "Error deleting store", error: error.message });
  }
});

module.exports = router;
