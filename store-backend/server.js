// // // const express = require('express');
// // // const mongoose = require('mongoose');
// // // const cors = require('cors');
// // // require('dotenv').config();

// // // const app = express();
// // // const PORT = process.env.PORT || 5000;

// // // // Middleware
// // // app.use(cors());
// // // app.use(express.json());

// // // // MongoDB Connection
// // // mongoose.connect(process.env.MONGO_URI, {
// // //   useNewUrlParser: true,
// // //   useUnifiedTopology: true,
// // // }).then(() => console.log(" MongoDB Connected"))
// // //   .catch(err => console.log("❌ MongoDB Error:", err));

// // // // Default Route
// // // app.get("/", (req, res) => {
// // //   res.send("Store API is running...");
// // // });
// // // const storeRoutes = require('./routes/storeRoutes');
// // // app.use('/api/stores', storeRoutes);

// // // // Start Server
// // // app.listen(PORT, () => {
// // //   console.log(`🚀 Server running on http://localhost:${PORT}`);
// // // });
// // const express = require('express');
// // const mongoose = require('mongoose');
// // const cors = require('cors');
// // require('dotenv').config();

// // const app = express();
// // app.use(cors()); // Enable CORS
// // app.use(express.json()); // Middleware to parse JSON

// // // Connect to MongoDB
// // mongoose.connect(process.env.MONGO_URI, {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// // }).then(() => console.log("MongoDB Connected"))
// //   .catch(err => console.log(err));

// // // Store Schema & Model
// // const StoreSchema = new mongoose.Schema({
// //   name: String,
// //   category: String,
// //   deliveryTime: String,
// //   rating: Number,
// //   reviews: Number,
// //   imageUrl: String,
// // });

// // const Store = mongoose.model('Store', StoreSchema);

// // // API Route to Get Stores
// // app.get('/api/stores', async (req, res) => {
// //   try {
// //     const stores = await Store.find();
// //     res.json(stores);
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // // Start Server
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// // const express = require("express");
// // const mongoose = require("mongoose");
// // const cors = require("cors");

// // const storeRoutes = require("./routes/storeRoutes");

// // const app = express();

// // // Middleware
// // app.use(express.json());
// // app.use(cors());

// // // Connect to MongoDB
// // mongoose
// //   .connect("mongodb://127.0.0.1:27017/storedatabase", {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true,
// //   })
// //   .then(() => console.log("MongoDB Connected"))
// //   .catch((err) => console.log(err));

// // // Routes
// // app.use("/api/stores", storeRoutes);

// // const PORT = 5000;
// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const storeRoutes = require('./routes/storeRoutes');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Serve static images from 'public' folder
// app.use('/images', express.static('public/images'));

// // Routes
// app.use('/api/stores', storeRoutes);

// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
require("dotenv").config(); // Load .env variables

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const storeRoutes = require("./routes/storeRoutes");
const productRoutes = require('./routes/productRoutes');
const app = express();
const cartRoutes = require('./routes/cartRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
// Middleware
// app.use(cors());


app.use(cors({
  origin: "http://localhost:3000", // your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "x-api-key"]
}));

app.use(express.json());

// Serve static images
app.use('/images', express.static('public/images'));


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/storedatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));
  
// Routes
app.use("/api/stores", storeRoutes);
// const productRoutes = require('./routes/productRoutes');
// app.use('/api/products', productRoutes);


// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

app.use('/api/reviews', reviewRoutes);

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));