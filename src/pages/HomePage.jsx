
// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import Navbar from '../components/Navbar';
// // import { useNavigate } from 'react-router-dom';

// // const HomePage = () => {
// //   const [stores, setStores] = useState([]);
// //   const [search, setSearch] = useState('');
// //   const navigate = useNavigate();

// //   // Fetch store data from your API
// //   useEffect(() => {
// //     axios.get('http://localhost:5000/api/stores')
// //       .then(response => {
// //         console.log("Store API Data:", response.data);
// //         setStores(response.data);
// //       })
// //       .catch(error => {
// //         console.error('Error fetching store data:', error);
// //       });
// //   }, []);

// //   // Filter stores based on search
// //   const filteredStores = stores.filter(
// //     (store) =>
// //       store.name.toLowerCase().includes(search.toLowerCase()) ||
// //       (store.category && store.category.toLowerCase().includes(search.toLowerCase()))
// //   );

// //   // Featured & available stores
// //   const featuredStores = filteredStores.slice(0, 4);
// //   const availableStores = filteredStores.slice(4);

// //   const handleStoreClick = (storeName) => {
// //     navigate(`/store/${storeName}`);
// //   };

// //   return (
// //     <div>
// //       <Navbar />
// //       <div className="max-w-7xl mx-auto p-6">
// //         <h1 className="text-3xl font-bold mb-4 text-center">Featured Stores</h1>

// //         {/* Search Bar */}
// //         <div className="flex justify-center mb-6">
// //           <input
// //             type="text"
// //             placeholder="Search by name or category"
// //             value={search}
// //             onChange={(e) => setSearch(e.target.value)}
// //             className="p-3 border border-gray-300 rounded-lg w-1/2"
// //           />
// //         </div>

// //         {/* Featured Stores Section */}
// //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
// //           {featuredStores.map((store) => (
// //             <div key={store.storeID} className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-300">
// //               <div className="flex justify-center mb-4">
// //                 <img
// //                   src={`http://localhost:5000/images/${store.image}`}
// //                   alt={store.name}
// //                   onError={(e) => (e.target.src = '/images/default.jpg')}
// //                   className="w-full h-48 object-cover rounded-md"
// //                 />
// //               </div>
// //               <h3 className="text-xl font-semibold text-center mb-2">{store.name}</h3>
// //               <p className="text-gray-600 text-center text-sm mb-1">Category: {store.category || 'N/A'}</p>
// //               <p className="text-gray-500 text-center text-sm mb-1">Delivery Time: {store.deliveryTime || '—'}</p>
// //               <p className="text-yellow-500 text-center text-sm mb-1">Rating: {store.rating} ★</p>
// //               <p className="text-center text-sm mb-4">Reviews: {store.reviews || 0}</p>
// //               <div className="flex justify-center">
// //                 <button
// //                   onClick={() => handleStoreClick(store.name)}
// //                   className="px-6 py-2 bg-yellow-500 text-white rounded-md uppercase font-bold hover:bg-yellow-400 active:bg-yellow-600 transition duration-200"
// //                 >
// //                   View Store
// //                 </button>
// //               </div>
// //             </div>
// //           ))}
// //         </div>

// //         {/* Available Stores Section */}
// //         <h2 className="text-2xl font-semibold mb-4 text-center">Available Stores</h2>
// //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
// //           {availableStores.map((store) => (
// //             <div key={store.storeID} className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-300">
// //               <div className="flex justify-center mb-4">
// //               <img
// //                   src={`/images/${store.image}`} // This works with `public/images/`
// //                   alt={store.name}
// //                   className="w-full h-40 object-cover rounded-lg mb-3"
// //                   onError={(e) => (e.target.src = "/images/default.jpg")} // Fallback image
// //                 />
// //               </div>
// //               <h3 className="text-xl font-semibold text-center mb-2">{store.name}</h3>
// //               <p className="text-gray-600 text-center text-sm mb-1">Category: {store.category || 'N/A'}</p>
// //               <p className="text-gray-500 text-center text-sm mb-1">Delivery Time: {store.deliveryTime || '—'}</p>
// //               <p className="text-yellow-500 text-center text-sm mb-1">Rating: {store.rating} ★</p>
// //               <p className="text-center text-sm mb-4">Reviews: {store.reviews || 0}</p>
// //               <div className="flex justify-center">
// //                 <button
// //                   onClick={() => handleStoreClick(store.name)}
// //                   className="px-6 py-2 bg-blue-600 text-white rounded-md uppercase font-bold hover:bg-blue-500 active:bg-blue-700 transition duration-200"
// //                 >
// //                   View Store
// //                 </button>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default HomePage;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Navbar from "../components/Navbar"; // ✅ Import your Navbar
// import { useNavigate } from "react-router-dom";

// const HomePage = () => {
//   const [stores, setStores] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/stores")
//       .then((res) => {
//         setStores(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Failed to fetch store data", err);
//         setLoading(false);
//       });
//   }, []);

//   const handleViewStore = (storeName) => {
//     navigate(`/store/${storeName}`);
//   };

//   return (
//     <div>
//       {/* ✅ Navbar */}
//       <Navbar />

//       <div className="max-w-7xl mx-auto p-6">
//         <h1 className="text-4xl font-bold text-center mb-4">Welcome to Our Store Platform</h1>
//         <p className="text-center text-gray-600 mb-10">Explore a wide variety of stores below!</p>

//         {loading ? (
//           <div className="text-center text-lg">Loading stores...</div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//             {stores.map((store) => (
//               <div
//                 key={store._id}
//                 className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105"
//               >
//                 <div className="flex justify-center mb-4">
//                 <img
//                   src={`/images/${store.image}`} // This works with `public/images/`
//                   alt={store.name}
//                   className="w-full h-40 object-cover rounded-lg mb-3"
//                   onError={(e) => (e.target.src = "/images/default.jpg")} // Fallback image
//                 />
//                 </div>
//                 <h3 className="text-xl font-semibold text-center mb-2">{store.name}</h3>
//                 <p className="text-gray-600 text-center text-sm mb-1">Location: {store.location}</p>
//                 <p className="text-yellow-500 text-center text-sm mb-1">Rating: {store.rating} ★</p>

//                 <div className="flex justify-center mt-4">
//                   <button
//                     onClick={() => handleViewStore(store.name)}
//                     className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
//                   >
//                     View Store
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default  HomePage;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/stores')
      .then(response => {
        setStores(response.data);
      })
      .catch(error => {
        console.error('Error fetching store data:', error);
      });
  }, []);

  const filteredStores = stores.filter(
    (store) =>
      store.name.toLowerCase().includes(search.toLowerCase()) ||
      (store.category && store.category.toLowerCase().includes(search.toLowerCase()))
  );

  const featuredStores = filteredStores.slice(0, 4);
  const availableStores = filteredStores.slice(4);

  const handleStoreClick = (storeName) => {
    navigate(`/store/${storeName}`);
  };

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-3xl font-bold mb-4 text-center">Featured Stores</h1>

        {/* Search Bar */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search by name or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Featured Stores Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {featuredStores.map((store) => (
            <div
              key={store.storeID}
              className="bg-white border border-gray-200 rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300"
            >
              <div className="mb-4">
              <img
                  src={`/images/${store.image}`} // This works with `public/images/`
                  alt={store.name}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                  onError={(e) => (e.target.src = "/images/default.jpg")} // Fallback image
                />
              </div>
              <h3 className="text-lg font-semibold text-center mb-1">{store.name}</h3>
              <p className="text-gray-600 text-center text-sm">Category: {store.category || 'N/A'}</p>
              <p className="text-gray-500 text-center text-sm">Delivery Time: {store.deliveryTime || '—'}</p>
              <p className="text-yellow-500 text-center text-sm">Rating: {store.rating} ★</p>
              <p className="text-center text-sm text-gray-600">Reviews: {store.reviews || 0}</p>
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => handleStoreClick(store.name)}
                  className="bg-yellow-500 hover:bg-yellow-400 text-white px-4 py-2 rounded font-bold text-sm uppercase transition duration-200"
                >
                  View Store
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Available Stores Section */}
        <h2 className="text-2xl font-semibold mb-4 text-center">Available Stores</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {availableStores.map((store) => (
            <div
              key={store.storeID}
              className="bg-white border border-gray-200 rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300"
            >
              <div className="mb-4">
              <img
                  src={`/images/${store.image}`} // This works with `public/images/`
                  alt={store.name}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                  onError={(e) => (e.target.src = "/images/default.jpg")} // Fallback image
                />
              </div>
              <h3 className="text-lg font-semibold text-center mb-1">{store.name}</h3>
              <p className="text-gray-600 text-center text-sm">Category: {store.category || 'N/A'}</p>
              <p className="text-gray-500 text-center text-sm">Delivery Time: {store.deliveryTime || '—'}</p>
              <p className="text-yellow-500 text-center text-sm">Rating: {store.rating} ★</p>
              <p className="text-center text-sm text-gray-600">Reviews: {store.reviews || 0}</p>
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => handleStoreClick(store.name)}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded font-bold text-sm uppercase transition duration-200"
                >
                  View Store
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
