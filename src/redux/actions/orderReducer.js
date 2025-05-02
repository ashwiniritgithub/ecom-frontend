// src/redux/reducers/orderReducer.js
import { FETCH_ORDER_HISTORY, PLACE_ORDER, SET_ORDER_ERROR } from '../actions/orderActions';

const initialState = {
  orderHistory: [],
  orderError: null,
  orderDetails: null,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDER_HISTORY:
      return { ...state, orderHistory: action.payload, orderError: null };
    case PLACE_ORDER:
      return { ...state, orderDetails: action.payload, orderError: null };
    case SET_ORDER_ERROR:
      return { ...state, orderError: action.payload };
    default:
      return state;
  }
};
