
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { auth } from '../firebase'; //  Import Firebase Auth

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: 10000 });
  const [inStockOnly, setInStockOnly] = useState(false);
  const [searchParams] = useSearchParams();
  const storeID = searchParams.get('storeID');
  const navigate = useNavigate();

  //  Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = 'http://localhost:5000/api/products';
        if (storeID) url += `/${storeID}`;
        const res = await axios.get(url);
        setProducts(res.data);
      } catch (error) {
        console.error("❌ Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [storeID]);

  //  Add to Cart (Backend + Firebase UID)
  const handleAddToCart = async (product) => {
    const userID = auth.currentUser?.uid;
    if (!userID) {
      alert("Please log in to add items to cart");
      return navigate('/login');
    }

    try {
      await axios.post(`http://localhost:5000/api/cart/${userID}`, {
        productID: product.productID,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      }, {
        headers: {
          'x-api-key': 'mysecureapikey' //  backend middleware key
        }
      });

      alert(" Item added to cart");
      navigate('/cart');
    } catch (error) {
      console.error("❌ Error adding to cart:", error);
      alert("Error adding to cart. Try again.");
    }
  };

  //  Filters
  const filteredProducts = products.filter(product =>
    (!categoryFilter || product.category === categoryFilter) &&
    product.price >= priceFilter.min &&
    product.price <= priceFilter.max &&
    (!inStockOnly || product.stock > 0)
  );

  const handleCategoryChange = (e) => setCategoryFilter(e.target.value);
  const handlePriceChange = (e) => setPriceFilter({ ...priceFilter, [e.target.name]: Number(e.target.value) });
  const toggleInStock = () => setInStockOnly(!inStockOnly);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">All Products</h1>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row justify-between mb-6">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <select onChange={handleCategoryChange} className="p-3 border border-gray-300 rounded-lg w-full sm:w-64">
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Beauty">Beauty</option>
              <option value="Grocery">Grocery</option>
              <option value="Pizza">Pizza</option>
            </select>

            <div className="flex space-x-2 w-full sm:w-auto">
              <input
                type="number"
                name="min"
                value={priceFilter.min}
                onChange={handlePriceChange}
                className="p-3 border border-gray-300 rounded-lg w-full sm:w-32"
                placeholder="Min Price"
              />
              <input
                type="number"
                name="max"
                value={priceFilter.max}
                onChange={handlePriceChange}
                className="p-3 border border-gray-300 rounded-lg w-full sm:w-32"
                placeholder="Max Price"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={toggleInStock}
                className="h-4 w-4"
              />
              <label>In Stock Only</label>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center">No products match your filters.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.productID} className="bg-white border border-gray-200 rounded-lg shadow-lg p-4">
                <div className="flex justify-center mb-4">
                  <img
                    src={`/images/${product.image || 'placeholder.jpg'}`}
                    onError={(e) => (e.target.src = '/images/placeholder.jpg')}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md"
                  />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">{product.name}</h3>
                <p className="text-gray-600 text-center text-sm mb-2">₹{product.price}</p>
                <p className="text-gray-500 text-center text-sm mb-2">Stock: {product.stock}</p>
                <div className="flex justify-center">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md font-bold hover:bg-blue-500 active:bg-blue-700"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListingPage;
