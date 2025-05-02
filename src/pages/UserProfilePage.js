


// import React, { useState, useEffect } from 'react';
// import Navbar from '../components/Navbar';
// import axios from 'axios';
// import { auth } from '../firebase';
// import { useLocation } from 'react-router-dom';

// const UserProfilePage = () => {
//   const [userDetails, setUserDetails] = useState({
//     name: '',
//     email: '',
//     address: '',
//     phoneNumber: '', 
//     savedPaymentMethods: [],
//   });

//   const [updatedUserDetails, setUpdatedUserDetails] = useState(userDetails);
//   const [isEditing, setIsEditing] = useState(false);
//   const [orderHistory, setOrderHistory] = useState([]);
//   const [reviews, setReviews] = useState([]);
//   const [activeReviewOrderID, setActiveReviewOrderID] = useState(null);
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState('');
//   const [userID, setUserID] = useState(null);
//   const [errors, setErrors] = useState({});


//   const location = useLocation();

//   useEffect(() => {
//     const fetchUserData = async (uid) => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/users/${uid}`, {
//           headers: { 'x-api-key': 'mysecureapikey' }
//         });

//         const user = res.data;
//         setUserDetails({
//           name: user.name,
//           email: user.email,
//           address: user.address || '',
//           phoneNumber: user.phoneNumber || '', 
//           savedPaymentMethods: ['card', 'upi'],
//         });
//         setUpdatedUserDetails({
//           name: user.name,
//           email: user.email,
//           address: user.address || '',
//           phoneNumber: user.phoneNumber || '',
//           savedPaymentMethods: ['card', 'upi']
//         });

//         setOrderHistory(user.orderHistory || []);

//         const reviewRes = await axios.get(`http://localhost:5000/api/reviews/user/${uid}`, {
//           headers: { 'x-api-key': 'mysecureapikey' }
//         });
//         setReviews(reviewRes.data);
//       } catch (err) {
//         console.error("Failed to fetch user or reviews:", err);
//       }
//     };

//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       if (user) {
//         setUserID(user.uid);
//         fetchUserData(user.uid);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedUserDetails((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSaveDetails = async () => {
//     try {
//       await axios.put(`http://localhost:5000/api/users/${userID}/update`, updatedUserDetails, {
//         headers: { 'x-api-key': 'mysecureapikey' }
//       });
//       setUserDetails(updatedUserDetails);
//       setIsEditing(false);
//       alert('✅ Profile updated');
//     } catch (err) {
//       console.error('Failed to update profile:', err);
//       alert('❌ Could not update profile');
//     }
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       <Navbar />
//       <div className="max-w-4xl mx-auto p-6">
//         <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">User Profile</h1>

//         <div className="bg-white p-6 rounded-xl shadow-md mb-6">
//           <h2 className="text-2xl font-semibold mb-4 text-gray-700">User Details</h2>
//           {isEditing ? (
//             <div className="space-y-4">
//               <input type="text" name="name" value={updatedUserDetails.name} onChange={handleEditChange} className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Name" />
//               <input type="email" name="email" value={updatedUserDetails.email} onChange={handleEditChange} className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Email" />
//               <input
//                 type="text"
//                 name="phoneNumber"
//                 value={updatedUserDetails.phoneNumber}
//                 onChange={handleEditChange}
//                 className="w-full p-3 border border-gray-300 rounded-lg"
//                 placeholder="Phone Number"
//               />
//               <textarea name="address" value={updatedUserDetails.address} onChange={handleEditChange} rows="4" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Address" />
//               <button onClick={handleSaveDetails} className="px-6 py-2 bg-green-500 text-white rounded-md font-bold hover:bg-green-400">Save</button>
//             </div>
//           ) : (
//             <div className="space-y-2">
//               <p><strong>Name:</strong> {userDetails.name}</p>
//               <p><strong>Email:</strong> {userDetails.email}</p>
//               <p><strong>Phone Number:</strong> {userDetails.phoneNumber}</p>
//               <p><strong>Address:</strong> {userDetails.address}</p>
//               <button onClick={() => setIsEditing(true)} className="mt-2 px-6 py-2 bg-blue-500 text-white rounded-md font-bold hover:bg-blue-400">Edit Profile</button>
//             </div>
//           )}
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow-md mb-6">
//           <h2 className="text-2xl font-semibold mb-4 text-gray-700">Order History</h2>
//           {orderHistory.length > 0 ? (
//             orderHistory.map((order) => {
//               const isReviewing = activeReviewOrderID === order.orderID;
//               return (
//                 <div key={order._id} className="mb-6 border-b pb-4">
//                   <p><strong>Order ID:</strong> {order.orderID}</p>
//                   <p><strong>Total:</strong> ₹{order.totalPrice}</p>
//                   <p><strong>Status:</strong> {order.status}</p>
//                   <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
//                   <p><strong>Delivery Address:</strong> {order.deliveryAddress}</p>

//                   <h4 className="font-semibold mt-3">Ordered Items:</h4>
//                   <ul className="list-disc list-inside text-gray-700">
//                     {order.itemList.map((item, index) => (
//                       <li key={index}>{item.name} × {item.quantity} - ₹{item.price}</li>
//                     ))}
//                   </ul>

//                   <button
//                     onClick={() =>
//                       setActiveReviewOrderID(
//                         activeReviewOrderID === order.orderID ? null : order.orderID
//                       )
//                     }
//                     className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600 transition"
//                   >
//                     {activeReviewOrderID === order.orderID ? 'Cancel Review' : 'Add Review'}
//                   </button>

//                   {isReviewing && (
//                     <div className="bg-white p-4 rounded shadow-md mt-3 border">
//                       <label className="block mb-2 font-semibold">Rating</label>
//                       <div className="flex space-x-2 mb-3">
//                         {[1, 2, 3, 4, 5].map((star) => (
//                           <span
//                             key={star}
//                             onClick={() => setRating(star)}
//                             className={`text-2xl cursor-pointer ${
//                               star <= rating ? 'text-yellow-400' : 'text-gray-300'
//                             }`}
//                           >
//                             ★
//                           </span>
//                         ))}
//                       </div>
//                       <textarea
//                         value={comment}
//                         onChange={(e) => setComment(e.target.value)}
//                         rows="3"
//                         className="w-full p-2 border rounded"
//                         placeholder="Write your review..."
//                       />
//                       <button
//                         onClick={async () => {
//                           if (!rating || !comment) {
//                             alert('Please enter rating and comment');
//                             return;
//                           }

//                           const reviewPayload = {
//                             reviewID: Date.now(),
//                             userID,
//                             storeID: order.storeID,
//                             orderID: order.orderID, //  Include orderID
//                             rating,
//                             comment,
//                           };
                          
                          
                          
//                           try {
//                             // await axios.post('http://localhost:5000/api/reviews/add', reviewPayload);
//                             await axios.post('http://localhost:5000/api/reviews/add', reviewPayload, {
//                               headers: { 'x-api-key': 'mysecureapikey' }
//                             });
                            
//                             const res = await axios.get(`http://localhost:5000/api/reviews/user/${userID}`);
//                             setReviews(res.data);
//                             setRating(0);
//                             setComment('');
//                             setActiveReviewOrderID(null);
//                           } catch (err) {
//                             console.error('Error submitting review:', err);
//                             alert('Failed to submit review');
//                           }
//                         }}
//                         className="mt-3 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-400"
//                       >
//                         Submit Review
//                       </button>
//                     </div>
//                   )}

//                   {/* <h4 className="font-semibold mt-3 mb-1">Your Past Reviews:</h4>
//                   {reviews
//                     .filter((r) => r.storeID === order.storeID)
//                     .map((review, index) => (
//                       <div key={index} className="bg-gray-100 p-3 rounded mb-2">
//                         <p>⭐ Rating: {review.rating}</p>
//                         <p>{review.comment}</p>
//                       </div>
//                     ))} */}
//                     <h4 className="font-semibold mt-3 mb-1">Your Past Reviews:</h4>
//                     {reviews
//   .filter((r) => r.orderID === order.orderID) //  Filter by orderID
//   .map((review, index) => (
//     <div key={index} className="bg-gray-100 p-3 rounded mb-2">
//       <p>⭐ Rating: {review.rating}</p>
//       <p>{review.comment}</p>
//     </div>
// ))}

//                 </div>
//               );
//             })
//           ) : (
//             <p>No orders found</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfilePage;




import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { auth } from '../firebase';
import { useLocation } from 'react-router-dom';

const UserProfilePage = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    address: '',
    phoneNumber: '', 
    savedPaymentMethods: [],
  });

  const [updatedUserDetails, setUpdatedUserDetails] = useState(userDetails);
  const [isEditing, setIsEditing] = useState(false);
  const [orderHistory, setOrderHistory] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [activeReviewOrderID, setActiveReviewOrderID] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [userID, setUserID] = useState(null);
  const [errors, setErrors] = useState({});

  const location = useLocation();

  useEffect(() => {
    const fetchUserData = async (uid) => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/${uid}`, {
          headers: { 'x-api-key': 'mysecureapikey' }
        });

        const user = res.data;
        setUserDetails({
          name: user.name,
          email: user.email,
          address: user.address || '',
          phoneNumber: user.phoneNumber || '', 
          savedPaymentMethods: ['card', 'upi'],
        });
        setUpdatedUserDetails({
          name: user.name,
          email: user.email,
          address: user.address || '',
          phoneNumber: user.phoneNumber || '',
          savedPaymentMethods: ['card', 'upi']
        });

        setOrderHistory(user.orderHistory || []);

        const reviewRes = await axios.get(`http://localhost:5000/api/reviews/user/${uid}`, {
          headers: { 'x-api-key': 'mysecureapikey' }
        });
        setReviews(reviewRes.data);
      } catch (err) {
        console.error("Failed to fetch user or reviews:", err);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserID(user.uid);
        fetchUserData(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const validateInputs = () => {
    const newErrors = {};

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.(com|in|org|net)$/;

  if (!emailRegex.test(updatedUserDetails.email)) {
    newErrors.email = 'Please enter a valid email like example@gmail.com';
  }
    

    if (!/^\d{10}$/.test(updatedUserDetails.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be exactly 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveDetails = async () => {
    if (!validateInputs()) return;

    try {
      await axios.put(`http://localhost:5000/api/users/${userID}/update`, updatedUserDetails, {
        headers: { 'x-api-key': 'mysecureapikey' }
      });
      setUserDetails(updatedUserDetails);
      setIsEditing(false);
      alert('✅ Profile updated');
    } catch (err) {
      console.error('Failed to update profile:', err);
      alert('❌ Could not update profile');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">User Profile</h1>

        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">User Details</h2>
          {isEditing ? (
            <div className="space-y-4">
              <input type="text" name="name" value={updatedUserDetails.name} onChange={handleEditChange} className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Name" />
              <input type="email" name="email" value={updatedUserDetails.email} onChange={handleEditChange} className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Email" />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              
              <input type="text" name="phoneNumber" value={updatedUserDetails.phoneNumber} onChange={handleEditChange} className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Phone Number" />
              {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}

              <textarea name="address" value={updatedUserDetails.address} onChange={handleEditChange} rows="4" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Address" />
              <button onClick={handleSaveDetails} className="px-6 py-2 bg-green-500 text-white rounded-md font-bold hover:bg-green-400">Save</button>
            </div>
          ) : (
            <div className="space-y-2">
              <p><strong>Name:</strong> {userDetails.name}</p>
              <p><strong>Email:</strong> {userDetails.email}</p>
              <p><strong>Phone Number:</strong> {userDetails.phoneNumber}</p>
              <p><strong>Address:</strong> {userDetails.address}</p>
              <button onClick={() => setIsEditing(true)} className="mt-2 px-6 py-2 bg-blue-500 text-white rounded-md font-bold hover:bg-blue-400">Edit Profile</button>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Order History</h2>
          {orderHistory.length > 0 ? (
            orderHistory.map((order) => {
              const isReviewing = activeReviewOrderID === order.orderID;
              return (
                <div key={order._id} className="mb-6 border-b pb-4">
                  <p><strong>Order ID:</strong> {order.orderID}</p>
                  <p><strong>Total:</strong> ₹{order.totalPrice}</p>
                  <p><strong>Status:</strong> {order.status}</p>
                  <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                  <p><strong>Delivery Address:</strong> {order.deliveryAddress}</p>

                  <h4 className="font-semibold mt-3">Ordered Items:</h4>
                  <ul className="list-disc list-inside text-gray-700">
                    {order.itemList.map((item, index) => (
                      <li key={index}>{item.name} × {item.quantity} - ₹{item.price}</li>
                    ))}
                  </ul>

                  <button
                    onClick={() =>
                      setActiveReviewOrderID(
                        activeReviewOrderID === order.orderID ? null : order.orderID
                      )
                    }
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600 transition"
                  >
                    {activeReviewOrderID === order.orderID ? 'Cancel Review' : 'Add Review'}
                  </button>

                  {isReviewing && (
                    <div className="bg-white p-4 rounded shadow-md mt-3 border">
                      <label className="block mb-2 font-semibold">Rating</label>
                      <div className="flex space-x-2 mb-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            onClick={() => setRating(star)}
                            className={`text-2xl cursor-pointer ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows="3"
                        className="w-full p-2 border rounded"
                        placeholder="Write your review..."
                      />
                      <button
                        onClick={async () => {
                          if (!rating || !comment) {
                            alert('Please enter rating and comment');
                            return;
                          }

                          const reviewPayload = {
                            reviewID: Date.now(),
                            userID,
                            storeID: order.storeID,
                            orderID: order.orderID,
                            rating,
                            comment,
                          };

                          try {
                            await axios.post('http://localhost:5000/api/reviews/add', reviewPayload, {
                              headers: { 'x-api-key': 'mysecureapikey' }
                            });
                            const res = await axios.get(`http://localhost:5000/api/reviews/user/${userID}`);
                            setReviews(res.data);
                            setRating(0);
                            setComment('');
                            setActiveReviewOrderID(null);
                          } catch (err) {
                            console.error('Error submitting review:', err);
                            alert('Failed to submit review');
                          }
                        }}
                        className="mt-3 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-400"
                      >
                        Submit Review
                      </button>
                    </div>
                  )}

                  <h4 className="font-semibold mt-3 mb-1">Your Past Reviews:</h4>
                  {reviews.filter((r) => r.orderID === order.orderID).map((review, index) => (
                    <div key={index} className="bg-gray-100 p-3 rounded mb-2">
                      <p>⭐ Rating: {review.rating}</p>
                      <p>{review.comment}</p>
                    </div>
                  ))}
                </div>
              );
            })
          ) : (
            <p>No orders found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
