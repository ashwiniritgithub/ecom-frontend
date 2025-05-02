// // src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import HomePage from './pages/HomePage';
// import LoginSignupPage from './pages/LoginSignupPage';
// import StoreListingPage from './pages/StoreListingPage';
// import ProductListingPage from './pages/ProductListingPage'; // Import Product Listing Page

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/login-signup" element={<LoginSignupPage />} />
//         <Route path="/store-listing" element={<StoreListingPage />} />
//         <Route path="/store/:storeName" element={<StoreListingPage />} />
//         <Route path="/store/:storeName/products" element={<ProductListingPage />} /> {/* New Route for Products */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';  // Your homepage
// import StoreListingPage from './pages/StoreListingPage';  // Store listing page

import StoreListingPage from './pages/StoreListingPage';
import ProductListingPage from './pages/ProductListingPage';  // Product listing page
import CartPage from './pages/CartPage'; // Your Cart Page
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';  // Import the Order Confirmation Page
import OrderTrackingPage from './pages/OrderTrackingPage';  // Import OrderTrackingPage
import UserProfilePage from './pages/UserProfilePage';  // Import the UserProfilePage component
import LoginSignupPage from './pages/LoginSignupPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login-signup" element={<LoginSignupPage />} />
        <Route path="/store/:storeName" element={<StoreListingPage />} />
        {/* <Route path="/store/:storeID/products" element={<ProductListingPage />} /> */}
        <Route path="/products" element={<ProductListingPage />} />


        <Route path="/cart" element={<CartPage />} /> {/* Cart Page */}
        <Route path="/checkout" element={<CheckoutPage />} />  {/* Checkout Page Route */}
        <Route path="/order-confirmation" element={<OrderConfirmationPage />} />  {/* Route for Order Confirmation */}
        <Route path="/order-tracking" element={<OrderTrackingPage />} />  {/* Add the route for Order Tracking */}
        <Route path="/orders" element={<OrderConfirmationPage />} /> {/* Order Confirmation Page for /orders */}
        <Route path="/profile" element={<UserProfilePage />} />  {/* Route for Profile Page */}
      </Routes>
    </Router>
  );
}

export default App;
