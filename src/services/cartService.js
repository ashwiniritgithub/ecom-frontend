import axios from 'axios';

const API_URL = 'https://your-backend-api.com/cart'; // Replace with your API endpoint

// Add item to the cart
export const addItemToCart = async (item) => {
  try {
    // Simulating an Axios request to add an item to the backend
    const response = await axios.post(API_URL, item);
    
    // Add item to localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));

    return response.data; // Return updated cart data
  } catch (error) {
    console.error('Error adding item to cart:', error);
    throw error;
  }
};

// Remove item from the cart
export const removeItemFromCart = async (productID) => {
  try {
    // Simulating a DELETE request to remove the item from the backend
    const response = await axios.delete(`${API_URL}/${productID}`);
    
    // Remove item from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.productID !== productID); // Remove item by ID
    localStorage.setItem('cart', JSON.stringify(cart));

    return response.data; // Return updated cart data
  } catch (error) {
    console.error('Error removing item from cart:', error);
    throw error;
  }
};

// Update item quantity in the cart
export const updateItemQuantity = async (productID, quantity) => {
  try {
    // Simulating a PUT request to update quantity in the backend
    const response = await axios.put(`${API_URL}/${productID}`, { quantity });

    // Update quantity in localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.map(item => 
      item.productID === productID ? { ...item, quantity } : item
    );
    localStorage.setItem('cart', JSON.stringify(cart));

    return response.data; // Return updated cart data
  } catch (error) {
    console.error('Error updating item quantity:', error);
    throw error;
  }
};

// Get all cart items from localStorage
export const getCartItems = async () => {
  try {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart; // Return the cart from localStorage
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return [];
  }
};
