import axios from 'axios';

// Simulated API to place an order and save it to localStorage
export const placeOrderAPI = async (orderData) => {
  try {
    const orderID = new Date().getTime();  // Using timestamp as unique order ID
    const orderDetails = { 
      ...orderData, 
      orderID,
      estimatedDeliveryTime: '30 mins',
      items: orderData.items,
    };

    // Save the order details in localStorage for simulation
    localStorage.setItem('orderDetails', JSON.stringify(orderDetails));

    return Promise.resolve({
      status: 200,
      data: orderDetails, // Simulated order data response
    });
  } catch (error) {
    return Promise.reject({ status: 500, error: "Failed to place order" });
  }
};

// Simulated API to fetch order details
export const getOrderDetailsAPI = async (orderID) => {
  try {
    const orderDetails = JSON.parse(localStorage.getItem('orderDetails')) || {};

    if (!orderDetails.orderID || orderDetails.orderID !== orderID) {
      throw new Error('Order not found');
    }

    return Promise.resolve({
      status: 200,
      data: orderDetails,  // Return the order details
    });
  } catch (error) {
    return Promise.reject({ status: 404, error: "Order not found" });
  }
};
