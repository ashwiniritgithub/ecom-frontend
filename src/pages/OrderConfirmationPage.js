
// import React, { useEffect, useState } from 'react';
// import Navbar from '../components/Navbar';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from '../firebase';
// import axios from 'axios';

// const OrderConfirmationPage = () => {
//   const [orderDetails, setOrderDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const orderIDFromState = location.state?.orderID;

//   useEffect(() => {
//     const fetchOrder = async (userID) => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/orders/${userID}`, {
//           headers: {
//             'x-api-key': 'mysecureapikey'
//           }
//         });

//         const orders = res.data || [];

//         if (orders.length === 0) {
//           setOrderDetails(null);
//           return;
//         }

//         // Sort by createdAt to get latest
//         const sorted = orders.sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );

//         const latestOrder = orderIDFromState
//           ? sorted.find((o) => o.orderID === orderIDFromState)
//           : sorted[0];

//         setOrderDetails(latestOrder || sorted[0]); // fallback
//       } catch (err) {
//         console.error("❌ Could not load latest order:", err);
//         setOrderDetails(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         fetchOrder(user.uid);
//       } else {
//         setOrderDetails(null);
//         setLoading(false);
//       }
//     });

//     return () => unsubscribe();
//   }, [location]);

//   if (loading) {
//     return (
//       <div>
//         <Navbar />
//         <div className="text-center mt-10 text-xl">Loading...</div>
//       </div>
//     );
//   }

//   if (!orderDetails) {
//     return (
//       <div>
//         <Navbar />
//         <div className="max-w-7xl mx-auto p-6 text-center text-gray-600">
//           No order found or user not logged in.
//         </div>
//       </div>
//     );
//   }

//   const formattedDate = new Date(orderDetails.createdAt).toLocaleString('en-IN', {
//     day: 'numeric',
//     month: 'short',
//     year: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit',
//   });

//   return (
//     <div>
//       <Navbar />
//       <div className="max-w-7xl mx-auto p-6">
//         <h1 className="text-3xl font-bold text-center mb-6">Order Confirmation</h1>

//         <div className="bg-gray-100 p-6 rounded-lg shadow-md">
//           <h2 className="text-2xl font-semibold mb-4 text-green-600">
//             ✅ Thank you for your order!
//           </h2>

//           <div className="mb-4">
//             <h3 className="text-xl font-semibold">Ordered On</h3>
//             <p>{formattedDate}</p>
//           </div>

//           <div className="mb-4">
//             <h3 className="text-xl font-semibold">Delivery Address</h3>
//             <p>{orderDetails.deliveryAddress}</p>
//           </div>

//           {orderDetails.billingAddress && orderDetails.billingAddress !== 'Not provided' && (
//             <div className="mb-4">
//               <h3 className="text-xl font-semibold">Billing Address</h3>
//               <p>{orderDetails.billingAddress}</p>
//             </div>
//           )}

//           <div className="mb-4">
//             <h3 className="text-xl font-semibold">Payment Method</h3>
//             <p>{orderDetails.paymentMethod}</p>
//           </div>

//           <div className="mb-4">
//             <h3 className="text-xl font-semibold">Total Amount</h3>
//             <p className="text-lg font-bold text-gray-800">₹{orderDetails.totalPrice}</p>
//           </div>

//           <div className="mb-6">
//             <button
//               onClick={() => navigate('/profile', { state: { showReview: true } })}
//               className="px-6 py-2 bg-yellow-500 text-white rounded-md font-bold hover:bg-yellow-400"
//             >
//               Leave a Review
//             </button>
//           </div>

//           <div className="flex justify-center">
//             <button
//               onClick={() => navigate('/order-tracking')}
//               className="px-6 py-2 bg-blue-500 text-white rounded-md font-bold hover:bg-blue-400"
//             >
//               Track Order
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderConfirmationPage;
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import axios from 'axios';

const OrderConfirmationPage = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const orderIDFromState = location.state?.orderID;
  const totalPriceFromState = location.state?.totalPrice;

  useEffect(() => {
    const fetchOrder = async (userID) => {
      try {
        const res = await axios.get(`http://localhost:5000/api/orders/${userID}`, {
          headers: {
            'x-api-key': 'mysecureapikey'
          }
        });

        const orders = res.data || [];

        if (orders.length === 0) {
          setOrderDetails(null);
          return;
        }

        // Sort by createdAt to get latest
        const sorted = orders.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        const latestOrder = orderIDFromState
          ? sorted.find((o) => o.orderID === orderIDFromState)
          : sorted[0];

        setOrderDetails(latestOrder || sorted[0]); // fallback
      } catch (err) {
        console.error("❌ Could not load latest order:", err);
        setOrderDetails(null);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchOrder(user.uid);
      } else {
        setOrderDetails(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [location]);

  const finalTotal = totalPriceFromState ?? orderDetails?.totalPrice ?? 0;

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="text-center mt-10 text-xl">Loading...</div>
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div>
        <Navbar />
        <div className="max-w-7xl mx-auto p-6 text-center text-gray-600">
          No order found or user not logged in.
        </div>
      </div>
    );
  }

  // const formattedDate = new Date(orderDetails.createdAt).toLocaleString('en-IN', {
  //   day: 'numeric',
  //   month: 'short',
  //   year: 'numeric',
  //   hour: '2-digit',
  //   minute: '2-digit',
  // });
  const formattedDate = new Date(orderDetails.createdAt).toLocaleString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  });
  
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Order Confirmation</h1>

        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-green-600">
            ✅ Thank you for your order!
          </h2>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">Ordered On</h3>
            <p>{formattedDate}</p>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">Delivery Address</h3>
            <p>{orderDetails.deliveryAddress}</p>
          </div>

          {orderDetails.billingAddress && orderDetails.billingAddress !== 'Not provided' && (
            <div className="mb-4">
              <h3 className="text-xl font-semibold">Billing Address</h3>
              <p>{orderDetails.billingAddress}</p>
            </div>
          )}

          <div className="mb-4">
            <h3 className="text-xl font-semibold">Payment Method</h3>
            <p>{orderDetails.paymentMethod}</p>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">Total Amount</h3>
            <p className="text-lg font-bold text-gray-800">₹{finalTotal}</p>
          </div>

          <div className="mb-6">
            <button
              onClick={() => navigate('/profile', { state: { showReview: true } })}
              className="px-6 py-2 bg-yellow-500 text-white rounded-md font-bold hover:bg-yellow-400"
            >
              Leave a Review
            </button>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => navigate('/order-tracking')}
              className="px-6 py-2 bg-blue-500 text-white rounded-md font-bold hover:bg-blue-400"
            >
              Track Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;



