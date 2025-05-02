
// import React, { useEffect, useState } from 'react';
// import Navbar from '../components/Navbar';
// import axios from 'axios';
// import { auth } from '../firebase';
// import { useNavigate } from 'react-router-dom';

// const CartPage = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [cartCount, setCartCount] = useState(0);
//   const navigate = useNavigate();
//   const [justOrdered, setJustOrdered] = useState(false);

//   const userID = auth.currentUser?.uid;

//   useEffect(() => {
//     if (!userID) return;
  
//     const localFlag = localStorage.getItem("justPlacedOrder");
  
//     if (localFlag === "true" || justOrdered) {
//       // ✅ Step 1: Clear UI only
//       setCartItems([]);
//       setCartCount(0);
  
//       // ✅ Step 2: Keep UI empty by state (even on nav)
//       setJustOrdered(true);
  
//       // ✅ Step 3: Clear the localStorage flag
//       localStorage.removeItem("justPlacedOrder");
//     } else {
//       // ✅ Step 4: Fetch only if no recent order
//       fetchCart();
//     }
//   }, [userID, justOrdered]);
  
//   const fetchCart = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/cart/${userID}`);
//       const items = res.data.items || [];
//       setCartItems(items);

//       // Update cart count
//       const count = items.reduce((acc, item) => acc + item.quantity, 0);
//       setCartCount(count);
//     } catch (err) {
//       console.error('Failed to load cart:', err);
//     }
//   };

//   const updateQuantity = async (productID, newQty) => {
//     if (newQty < 1) return;
//     try {
//       await axios.put(`http://localhost:5000/api/cart/${userID}`, {
//         productID,
//         quantity: newQty,
//       }, {
//         headers: { 'x-api-key': 'mysecureapikey' }
//       });

//       const updatedItems = cartItems.map(item =>
//         item.productID === productID ? { ...item, quantity: newQty } : item
//       );
//       setCartItems(updatedItems);

//       const count = updatedItems.reduce((acc, item) => acc + item.quantity, 0);
//       setCartCount(count);
//     } catch (err) {
//       console.error('Quantity update failed:', err);
//     }
//   };

//   const removeItem = async (productID) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/cart/${userID}/${productID}`, {
//         headers: { 'x-api-key': 'mysecureapikey' }
//       });

//       const updatedItems = cartItems.filter(item => item.productID !== productID);
//       setCartItems(updatedItems);

//       const count = updatedItems.reduce((acc, item) => acc + item.quantity, 0);
//       setCartCount(count);
//     } catch (err) {
//       console.error('Remove item failed:', err);
//     }
//   };

//   const calculateTotal = () => {
//     const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
//     const tax = subtotal * 0.1;
//     const deliveryFee = 5;
//     return { subtotal, tax, deliveryFee, total: subtotal + tax + deliveryFee };
//   };

//   const { subtotal, tax, deliveryFee, total } = calculateTotal();

//   const handleProceedToCheckout = () => {
//     navigate('/checkout', {
//       state: {
//         cartItems,
//         total
//       }
//     });
//   };

//   return (
//     <div>
//       <Navbar cartCount={cartCount} />
//       <div className="max-w-7xl mx-auto p-6">
//         <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Your Cart</h1>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//           {cartItems.length > 0 ? cartItems.map((item, index) => (
//             <div key={`${item.productID}-${index}`} className="bg-white border border-gray-300 rounded-lg shadow-md p-4">
//               <img src={`/images/${item.image}`} alt={item.name} className="w-full h-48 object-cover rounded-md mb-4" />
//               <h3 className="text-xl font-semibold text-center">{item.name}</h3>
//               <p className="text-gray-600 text-center">Price: ₹{item.price}</p>

//               <div className="flex justify-center items-center space-x-4 my-4">
//                 <button
//                   onClick={() => updateQuantity(item.productID, item.quantity - 1)}
//                   className="px-4 py-2 bg-blue-500 text-white rounded-md"
//                   disabled={item.quantity <= 1}
//                 >-</button>
//                 <span className="px-4">{item.quantity}</span>
//                 <button
//                   onClick={() => updateQuantity(item.productID, item.quantity + 1)}
//                   className="px-4 py-2 bg-blue-500 text-white rounded-md"
//                 >+</button>
//               </div>

//               <div className="flex justify-center">
//                 <button
//                   onClick={() => removeItem(item.productID)}
//                   className="px-6 py-2 bg-red-600 text-white rounded-md font-bold hover:bg-red-500"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           )) : (
//             <p className="text-center text-xl text-gray-600">Your cart is empty</p>
//           )}
//         </div>

//         <div className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-center">
//           <div>
//             <h2 className="text-2xl font-bold">Order Summary</h2>
//             <p className="text-lg">Subtotal: ₹{subtotal}</p>
//             <p className="text-lg">Tax (10%): ₹{tax}</p>
//             <p className="text-lg">Delivery Fee: ₹{deliveryFee}</p>
//             <p className="text-xl font-semibold mt-4">Total: ₹{total}</p>
//           </div>

//           <div className="mt-6 sm:mt-0">
//             <button
//               onClick={handleProceedToCheckout}
//               className="px-6 py-3 bg-blue-600 text-white rounded-md font-bold hover:bg-blue-500"
//             >
//               Proceed to Checkout
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartPage;
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  const [justOrdered, setJustOrdered] = useState(false);
  const userID = auth.currentUser?.uid;

  // useEffect(() => {
  //   if (!userID) return;
  
  //   const localFlag = localStorage.getItem("justPlacedOrder");
  
  //   if (localFlag === "true") {
  //     setCartItems([]);          // Clear UI
  //     setCartCount(0);
  //     setJustOrdered(true);
  
  //     //  Prevent backend fetch by skipping fetchCart()
  //     return;
  //   }
  
  //   fetchCart(); // ✅ only fetch from backend if not just ordered
  // }, [userID]);
  
  // useEffect(() => {
  //   // ✅ Clear local flag AFTER UI clears (triggered once)
  //   if (justOrdered) {
  //     localStorage.removeItem("justPlacedOrder");
  //   }
  // }, [justOrdered]);
  
  useEffect(() => {
    if (!userID) return;
  
    const localFlag = localStorage.getItem("justPlacedOrder");
  
    if (localFlag === "true") {
      // 1. Clear cart from UI
      setCartItems([]);
      setCartCount(0);
  
      // 2. Keep cart UI empty on any navigation
      setJustOrdered(true);
  
      return; //  Skip fetching
    }
  
    // ✅ Only fetch if not just ordered
    if (!justOrdered) {
      fetchCart();
    }
  }, [userID]);
  useEffect(() => {
    if (justOrdered) {
      // ⏳ Wait one second (optional for visual clarity)
      setTimeout(() => {
        localStorage.removeItem("justPlacedOrder");
      }, 1000);
    }
  }, [justOrdered]);
  
  const fetchCart = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/cart/${userID}`);
      const items = res.data.items || [];
      setCartItems(items);
      const count = items.reduce((acc, item) => acc + item.quantity, 0);
      setCartCount(count);
    } catch (err) {
      console.error('Failed to load cart:', err);
    }
  };

  const updateQuantity = async (productID, newQty) => {
    if (newQty < 1) return;
    try {
      await axios.put(`http://localhost:5000/api/cart/${userID}`, {
        productID,
        quantity: newQty,
      }, {
        headers: { 'x-api-key': 'mysecureapikey' }
      });

      const updatedItems = cartItems.map(item =>
        item.productID === productID ? { ...item, quantity: newQty } : item
      );
      setCartItems(updatedItems);

      const count = updatedItems.reduce((acc, item) => acc + item.quantity, 0);
      setCartCount(count);
    } catch (err) {
      console.error('Quantity update failed:', err);
    }
  };

  const removeItem = async (productID) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${userID}/${productID}`, {
        headers: { 'x-api-key': 'mysecureapikey' }
      });

      const updatedItems = cartItems.filter(item => item.productID !== productID);
      setCartItems(updatedItems);

      const count = updatedItems.reduce((acc, item) => acc + item.quantity, 0);
      setCartCount(count);
    } catch (err) {
      console.error('Remove item failed:', err);
    }
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = subtotal * 0.1;
    const deliveryFee = 5;
    return { subtotal, tax, deliveryFee, total: subtotal + tax + deliveryFee };
  };

  const { subtotal, tax, deliveryFee, total } = calculateTotal();

  const handleProceedToCheckout = () => {
    localStorage.setItem("justPlacedOrder", "true"); // ✅ Set flag to trigger cart clear in UI
    navigate('/checkout', {
      state: {
        cartItems,
        total
      }
    });
  };

  return (
    <div>
      <Navbar cartCount={cartCount} />
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Your Cart</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {cartItems.length > 0 ? cartItems.map((item, index) => (
            <div key={`${item.productID}-${index}`} className="bg-white border border-gray-300 rounded-lg shadow-md p-4">
              <img src={`/images/${item.image}`} alt={item.name} className="w-full h-48 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-semibold text-center">{item.name}</h3>
              <p className="text-gray-600 text-center">Price: ₹{item.price}</p>

              <div className="flex justify-center items-center space-x-4 my-4">
                <button
                  onClick={() => updateQuantity(item.productID, item.quantity - 1)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  disabled={item.quantity <= 1}
                >-</button>
                <span className="px-4">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.productID, item.quantity + 1)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >+</button>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => removeItem(item.productID)}
                  className="px-6 py-2 bg-red-600 text-white rounded-md font-bold hover:bg-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          )) : (
            <p className="text-center text-xl text-gray-600">Your cart is empty</p>
          )}
        </div>

        <div className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Order Summary</h2>
            <p className="text-lg">Subtotal: ₹{subtotal}</p>
            <p className="text-lg">Tax (10%): ₹{tax}</p>
            <p className="text-lg">Delivery Fee: ₹{deliveryFee}</p>
            <p className="text-xl font-semibold mt-4">Total: ₹{total}</p>
          </div>

          <div className="mt-6 sm:mt-0">
            <button
              onClick={handleProceedToCheckout}
              className="px-6 py-3 bg-blue-600 text-white rounded-md font-bold hover:bg-blue-500"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
