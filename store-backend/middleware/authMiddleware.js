// middleware/authMiddleware.js

const protectRoute = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
  
    if (apiKey && apiKey === 'mysecureapikey') {
      next(); 
    } else {
      return res.status(403).json({ message: "❌ Unauthorized access" });
    }
  };
  
  module.exports = protectRoute;
  