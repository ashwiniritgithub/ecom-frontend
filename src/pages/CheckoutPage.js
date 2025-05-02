
// // import React, { useState } from 'react';
// // import Navbar from '../components/Navbar';
// // import { useNavigate, useLocation } from 'react-router-dom';
// // import axios from 'axios';
// // import { auth } from '../firebase';

// // const CheckoutPage = () => {
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   const cartItems = location.state?.cartItems || [];
// //   const total = location.state?.total || 0;

// //   const [address, setAddress] = useState('');
// //   const [billingAddress, setBillingAddress] = useState('');
// //   const [paymentMethod, setPaymentMethod] = useState('');

// //   const handlePlaceOrder = async () => {
// //     const user = auth.currentUser;

// //     if (!user) {
// //       alert('User not logged in.');
// //       return;
// //     }

// //     if (!address || !paymentMethod) {
// //       alert('Please fill in all required fields.');
// //       return;
// //     }

// //     const itemList = cartItems.map(item => ({
// //       productID: item.productID,
// //       name: item.name,
// //       quantity: item.quantity,
// //       price: item.price,
// //       image: item.image,
// //     }));

// //     const orderPayload = {
// //       userID: user.uid,
// //       storeID: cartItems[0]?.storeID || 101,
// //       itemList,
// //       totalPrice: Math.round(total),
// //       status: 'Confirmed',
// //       deliveryAddress: address,
// //       billingAddress: billingAddress || 'Not provided',
// //       paymentMethod,
// //     };

// //     console.log(' Sending order payload:', orderPayload);

// //     try {
// //       const res = await axios.post('http://localhost:5000/api/orders', orderPayload, {
// //         headers: {
// //           'x-api-key': 'mysecureapikey'
// //         }
// //       });

// //       console.log('✅ Order placed:', res.data);

// //       // Navigate to confirmation page with order ID + price
// //       navigate('/order-confirmation', {
// //         state: {
// //           orderID: res.data.order.orderID,
// //           totalPrice: res.data.order.totalPrice,
// //         }
// //       });
      
      

// //     } catch (error) {
// //       console.error('❌ Failed to place order:', error.response?.data || error.message);
// //       alert('Failed to place order. Please try again.');
// //     }
// //   };

// //   return (
// //     <div>
// //       <Navbar />
// //       <div className="max-w-7xl mx-auto p-6">
// //         <h1 className="text-3xl font-bold text-center mb-6">Checkout</h1>

// //         {/* Delivery Address */}
// //         <div className="mb-6">
// //           <label className="block text-xl font-semibold mb-2">Delivery Address</label>
// //           <textarea
// //             value={address}
// //             onChange={(e) => setAddress(e.target.value)}
// //             placeholder="Enter your delivery address"
// //             className="w-full p-3 border border-gray-300 rounded-lg"
// //             rows="4"
// //           />
// //         </div>

// //         {/* Billing Address */}
// //         <div className="mb-6">
// //           <label className="block text-xl font-semibold mb-2">Billing Address (Optional)</label>
// //           <textarea
// //             value={billingAddress}
// //             onChange={(e) => setBillingAddress(e.target.value)}
// //             placeholder="Enter your billing address"
// //             className="w-full p-3 border border-gray-300 rounded-lg"
// //             rows="4"
// //           />
// //         </div>

// //         {/* Payment Method */}
// //         <div className="mb-6">
// //           <label className="block text-xl font-semibold mb-2">Payment Method</label>
// //           <div className="space-y-2">
// //             {['card', 'upi', 'wallet', 'cod'].map((method) => (
// //               <label key={method} className="flex items-center">
// //                 <input
// //                   type="radio"
// //                   value={method}
// //                   checked={paymentMethod === method}
// //                   onChange={(e) => setPaymentMethod(e.target.value)}
// //                   className="mr-2"
// //                 />
// //                 <span className="capitalize">{method} Payment</span>
// //               </label>
// //             ))}
// //           </div>
// //         </div>

// //         {/* Order Summary */}
// //         <div className="mb-6">
// //           <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
// //           <p>Total Amount: ₹{total}</p>

// //           <h3 className="text-lg font-semibold mt-4 mb-2">Items:</h3>
// //           {cartItems.length > 0 ? (
// //             cartItems.map((item, index) => (
// //               <div key={index} className="flex justify-between border-b py-1">
// //                 <span>{item.name} (x{item.quantity})</span>
// //                 <span>₹{item.price * item.quantity}</span>
// //               </div>
// //             ))
// //           ) : (
// //             <p>No items in cart.</p>
// //           )}
// //         </div>

// //         {/* Place Order Button */}
// //         <div className="flex justify-center">
// //           <button
// //             onClick={handlePlaceOrder}
// //             className="px-6 py-2 bg-green-500 text-white rounded-md font-bold hover:bg-green-400"
// //           >
// //             Place Order
// //           </button>
// //         </div>

// //         {/* Track Order Button */}
// //         <div className="flex justify-center mt-4">
// //           <button
// //             onClick={() => navigate('/order-tracking')}
// //             className="px-6 py-2 bg-blue-500 text-white rounded-md font-bold hover:bg-blue-400"
// //           >
// //             Track Order
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CheckoutPage;


import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { auth } from '../firebase';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const cartItems = location.state?.cartItems || [];
  const total = location.state?.total || 0;

  const [address, setAddress] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

//   const handlePlaceOrder = async () => {
//     const user = auth.currentUser;

//     if (!user) {
//       alert('User not logged in.');
//       return;
//     }

//     if (!address || !paymentMethod) {
//       alert('Please fill in all required fields.');
//       return;
//     }

//     const itemList = cartItems.map(item => ({
//       productID: item.productID,
//       name: item.name,
//       quantity: item.quantity,
//       price: item.price,
//       image: item.image,
//     }));

//     const orderPayload = {
//       userID: user.uid,
//       storeID: cartItems[0]?.storeID || 101,
//       itemList,
//       totalPrice: Math.round(total),
//       status: 'Confirmed',
//       deliveryAddress: address,
//       billingAddress: billingAddress || 'Not provided',
//       paymentMethod,
//     };

//     console.log(' Sending order payload:', orderPayload);

//     try {
//       //  1. Place the order
//       const res = await axios.post('http://localhost:5000/api/orders', orderPayload, {
//         headers: { 'x-api-key': 'mysecureapikey' }
//       });

//       console.log('✅ Order placed:', res.data);

//       // //  2. Clear the cart after order success
//       // await axios.delete(`http://localhost:5000/api/cart/${user.uid}`, {
//       //   headers: { 'x-api-key': 'mysecureapikey' }
//       // });
//       // console.log(' Cart cleared after order');

//       //  3. Navigate to order confirmation page
//       //  Add this before navigating

// // localStorage.setItem("justPlacedOrder", "true");

// // // Then navigate
// // navigate('/order-confirmation', {
// //   state: {
// //     orderID: res.data.order.orderID,
// //     totalPrice: res.data.order.totalPrice,
// //   }
// // });
// const orderData = {
//   orderID: res.data.order.orderID,
//   deliveryAddress: address,
//   totalAmount: res.data.order.totalPrice,
//   status: 'Order Confirmed',
// };

// localStorage.setItem('orderDetails', JSON.stringify(orderData));
// localStorage.setItem('justPlacedOrder', 'true');

// navigate('/order-confirmation', {
//   state: {
//     orderID: res.data.order.orderID,
//     totalPrice: res.data.order.totalPrice,
//   }
// });

      

//     } catch (error) {
//       console.error(' Failed to place order:', error.response?.data || error.message);
//       alert('Failed to place order. Please try again.');
//     }
//   };


const handlePlaceOrder = async () => {
  const user = auth.currentUser;

  if (!user) {
    alert('User not logged in.');
    return;
  }

  if (!address || !paymentMethod) {
    alert('Please fill in all required fields.');
    return;
  }

  // ✅ Include storeID in each item
  const itemList = cartItems.map(item => ({
    productID: item.productID,
    name: item.name,
    quantity: item.quantity,
    price: item.price,
    image: item.image,
    storeID: item.storeID // ✅ this is the fix
  }));

  const orderPayload = {
    userID: user.uid,
    // ✅ this storeID is now safe to use (same as in backend)
    storeID: cartItems[0]?.storeID || 101,
    itemList,
    totalPrice: Math.round(total),
    status: 'Confirmed',
    deliveryAddress: address,
    billingAddress: billingAddress || 'Not provided',
    paymentMethod,
  };

  console.log('🚀 Sending order payload:', orderPayload);

  try {
    const res = await axios.post('http://localhost:5000/api/orders', orderPayload, {
      headers: { 'x-api-key': 'mysecureapikey' }
    });

    console.log('✅ Order placed:', res.data);

    const orderData = {
      orderID: res.data.order.orderID,
      deliveryAddress: address,
      totalAmount: res.data.order.totalPrice,
      status: 'Order Confirmed',
    };

    localStorage.setItem('orderDetails', JSON.stringify(orderData));
    localStorage.setItem('justPlacedOrder', 'true');

    navigate('/order-confirmation', {
      state: {
        orderID: res.data.order.orderID,
        totalPrice: res.data.order.totalPrice,
      }
    });

  } catch (error) {
    console.error('❌ Failed to place order:', error.response?.data || error.message);
    alert('Failed to place order. Please try again.');
  }
};

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Checkout</h1>

        {/* Delivery Address */}
        <div className="mb-6">
          <label className="block text-xl font-semibold mb-2">Delivery Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your delivery address"
            className="w-full p-3 border border-gray-300 rounded-lg"
            rows="4"
          />
        </div>

        {/* Billing Address */}
        <div className="mb-6">
          <label className="block text-xl font-semibold mb-2">Billing Address (Optional)</label>
          <textarea
            value={billingAddress}
            onChange={(e) => setBillingAddress(e.target.value)}
            placeholder="Enter your billing address"
            className="w-full p-3 border border-gray-300 rounded-lg"
            rows="4"
          />
        </div>

        {/* Payment Method */}
        <div className="mb-6">
          <label className="block text-xl font-semibold mb-2">Payment Method</label>
          <div className="space-y-2">
            {['card', 'upi', 'wallet', 'cod'].map((method) => (
              <label key={method} className="flex items-center">
                <input
                  type="radio"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                />
                <span className="capitalize">{method} Payment</span>
              </label>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <p>Total Amount: ₹{total}</p>

          <h3 className="text-lg font-semibold mt-4 mb-2">Items:</h3>
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div key={index} className="flex justify-between border-b py-1">
                <span>{item.name} (x{item.quantity})</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))
          ) : (
            <p>No items in cart.</p>
          )}
        </div>

        {/* Place Order Button */}
        <div className="flex justify-center">
          <button
            onClick={handlePlaceOrder}
            className="px-6 py-2 bg-green-500 text-white rounded-md font-bold hover:bg-green-400"
          >
            Place Order
          </button>
        </div>

        {/* Track Order Button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => navigate('/order-tracking')}
            className="px-6 py-2 bg-blue-500 text-white rounded-md font-bold hover:bg-blue-400"
          >
            Track Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
