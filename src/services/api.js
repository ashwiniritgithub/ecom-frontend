// src/services/api.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://your-backend-url.com/api', // Replace this with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fetch order history
export const fetchOrderHistory = () => {
  return axiosInstance.get('/orders')  // Your backend API endpoint
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

// Place an order
export const placeOrder = (orderData) => {
  return axiosInstance.post('/orders', orderData) // Your backend API endpoint
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};
