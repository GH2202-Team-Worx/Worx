import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import products from "./products";
import singleProduct from "./singleProduct";
import createUserReducer from "./newUser";
import usersReducer from "./users";
import cartReducer from './cart';
import ordersReducer from "./orders";
import orderReducer from "./singleOrder";
import reviewReducer from "./reviews";

const reducer = combineReducers({
  auth,
  products,
  singleProduct,
  cartReducer,
  createUserReducer,
  usersReducer,
  ordersReducer,
  orderReducer,
  reviewReducer
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
