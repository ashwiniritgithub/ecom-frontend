// src/redux/actions/orderActions.js
export const FETCH_ORDER_HISTORY = 'FETCH_ORDER_HISTORY';
export const PLACE_ORDER = 'PLACE_ORDER';
export const SET_ORDER_ERROR = 'SET_ORDER_ERROR';

// Fetch order history action
export const fetchOrderHistory = () => async dispatch => {
  try {
    const data = await fetchOrderHistory(); // Call to API service
    dispatch({
      type: FETCH_ORDER_HISTORY,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SET_ORDER_ERROR,
      payload: error.message,
    });
  }
};

// Place order action
export const placeOrder = (orderData) => async dispatch => {
  try {
    const data = await placeOrder(orderData); // Call to API service
    dispatch({
      type: PLACE_ORDER,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SET_ORDER_ERROR,
      payload: error.message,
    });
  }
};
