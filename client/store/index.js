import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import products from './products';
import singleProduct from './singleProduct';
import cartReducer from './cart';
import createUserReducer from './newUser';
import usersReducer from './users';
import ordersReducer from './orders';
import orderReducer from './singleOrder';

const reducer = combineReducers({
  auth,
  products,
  singleProduct,
  cartReducer,
  createUserReducer,
  usersReducer,
  ordersReducer,
  orderReducer,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
