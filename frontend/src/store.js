import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  getSliderReducer,
  newSliderReducer
} from "./reducers/sliderReducers";

import {
  productsReducer,
  newProductReducer,
  productReducer,
  productDetailsReducer,
  newReviewReducer,
  productReviewsReducer,
  reviewReducer,
} from "./reducers/productReducers";

import categoryReducer from "./reducers/categoryReducers";

import { productSlugReducers } from './reducers/productSlugReducers';
import { discountReducer } from "./reducers/discountReducers";

import {
  authReducer,
  userReducer,
  forgotPasswordReducer,
  allUsersReducer,
  userDetailsReducer,
} from "./reducers/userReducers";

//Delivery Man Reducer
import {deliveryManReducer, allDeliveryMenReducer} from './reducers/deliveryManReducers';

import { cartReducer } from "./reducers/cartReducers";

import {
  newOrderReducer,
  myOrdersReducer,
  orderDetailsReducer,
  allOrdersReducer,
  orderReducer,
} from "./reducers/orderReducers";

const reducer = combineReducers({
 
  getSlider: getSliderReducer,
  newSlider: newSliderReducer,
  productsss: productSlugReducers,
  products: productsReducer,
  productDetails: productDetailsReducer,
  newProduct: newProductReducer,
  product: productReducer,
  productReviews: productReviewsReducer,
  review: reviewReducer,
  category: categoryReducer,
  auth: authReducer,
  user: userReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  allOrders: allOrdersReducer,
  orderDetails: orderDetailsReducer,
  order: orderReducer,
  newReview: newReviewReducer,
  discount: discountReducer,
  deliveryMan: deliveryManReducer,
  allDeliveryMen: allDeliveryMenReducer

});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],

    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};
const middlware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlware))
);
export default store;
