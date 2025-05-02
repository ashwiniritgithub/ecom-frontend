

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
const StoreListingPage = () => {
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/stores")
      .then((response) => {
        setStores(response.data);
        setFilteredStores(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load stores:", error);
        setError("Failed to load stores. Please try again.");
        setLoading(false);
      });
  }, []);
  

  // const handleViewProducts = (storeId) => {
  //   navigate(`/store/${storeId}/products`);
  // };
  const handleViewProducts = () => {
    navigate(`/products`);
  };
  
  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearch(searchValue);

    const filtered = stores.filter(
      (store) =>
        store.name.toLowerCase().includes(searchValue) ||
        store.location.toLowerCase().includes(searchValue)
    );

    setFilteredStores(filtered);
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">Store Listing</h1>

        {/* Search Bar */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search by name or location"
            value={search}
            onChange={handleSearch}
            className="p-3 border border-gray-300 rounded-lg w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Display error if any */}
        {error && <div className="text-red-600 text-center">{error}</div>}

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-gray-200 animate-pulse h-40 rounded-lg"></div>
            ))}
          </div>
        )}

        {/* Displaying all filtered stores */}
        {!loading && filteredStores.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {filteredStores.map((store) => (
              <div
                key={store._id}
                className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-300"
              >
                {/*  Correct Image Loading */}
                <img
                  src={`/images/${store.image}`} // This works with `public/images/`
                  alt={store.name}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                  onError={(e) => (e.target.src = "/images/default.jpg")} // Fallback image
                />

                <h3 className="text-xl font-semibold text-center mb-2">{store.name}</h3>
                <p className="text-gray-600 text-center">{`Location: ${store.location}`}</p>
                <p className="text-yellow-500 text-center">{`Rating: ${store.rating} ★`}</p>

                <div className="flex justify-center mt-4">
                  <button
                    // onClick={() => handleViewProducts(store._id)}
                    onClick={handleViewProducts}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                  >
                    View Products
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loading && <div className="text-center text-xl">No stores found</div>
        )}
      </div>
    </div>
  );
};

export default StoreListingPage;
