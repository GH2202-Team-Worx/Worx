import axios from 'axios';

const GET_CART = 'GET_CART';
const ADD_PRODUCT = 'ADD_PRODUCT';
const EDIT_PRODUCT = 'EDIT_PRODUCT';
const DELETE_ITEM = 'DELETE_ITEM';
const SEND_ORDER = 'SEND_ORDER';
const PURCHASE_INTENT = 'PURCHASE_INTENT';

const _getCart = (cartProducts) => ({
  type: GET_CART,
  cartProducts,
});

export const _addProduct = (product) => ({
  type: ADD_PRODUCT,
  product,
});

export const _editProduct = (product) => ({
  type: EDIT_PRODUCT,
  product,
});

export const _deleteProduct = (product) => ({
  type: DELETE_ITEM,
  product,
});

const _sendOrder = (payload) => ({
  type: SEND_ORDER,
  payload,
});

const _intendToPurchase = (clientSecret) => ({
  type: PURCHASE_INTENT,
  clientSecret,
});

export const getCart = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`api/orders/${userId}`);
      dispatch(_getCart(data.products));
    } catch (err) {
      console.error('😭 Unable to grab cart', err);
    }
  };
};

//addProduct thunk is called only for loggedin users in SingleProduct.Since backend returns cart and product, I only passed the product to _addProduct. That way, guests and loggedin users can both use the _addProduct creator.
export const addProduct = (userId, product) => {
  return async (dispatch) => {
    try {
      // console.log('user id from thunk: ', userId)
      // console.log('prod from thunk: ', product)
      const { data } = await axios.post('/api/orders/cart', {
        userId,
        product,
      });
      // console.log('data back from api', data)
      dispatch(_addProduct(data));
    } catch (err) {
      console.error('😤 Unable to add product', err);
    }
  };
};

export const editProduct = (userId, product) => {
  return async (dispatch) => {
    try {
      await axios.put(`/api/orders/cart/${product.id}`, {
        userId,
        product,
      });
      dispatch(_editProduct(product));
    } catch (err) {
      console.error('😤 Unable to edit product', err);
    }
  };
};

export const deleteProduct = (userId, product) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/orders/cart/${product.id}`, {
        data: { userId },
      });
      dispatch(_deleteProduct(product));
    } catch (err) {
      console.error('😡 Unable to delete product', err);
    }
  };
};

//this isn't set up on the backend yet. i think we will end up having to add shipping and billing into this request though because it is the one that is going to complete the order, where the others will update it
//do we send the processing status or should that just be changed automatically on the backend route connected to send order
export const sendOrder = (cartItems, cartTotal) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/orders`, cartItems, cartTotal);
      //what data is being returned here? Just this cart?
      dispatch(_sendOrder(data));
    } catch (err) {
      console.error('Unable to send order...', err);
    }
  };
};

export const intendToPurchase = (cartTotal) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/api/orders/create-payment-intent', {
        cartTotal,
      });
      dispatch(_intendToPurchase(data));
    } catch (err) {
      console.error('Unable to create payment intent...', err);
    }
  };
};

const initialState = {
  cartItems: [],
  cartTotal: 0,
  clientSecret: '',
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART: {
      const cart = action.cartProducts;
      const cartTotal = cart.reduce(
        (prevVal, currentVal) => prevVal + +currentVal.price,
        0
      );

      return {
        ...state,
        cartItems: cart,
        cartTotal,
      };
    }
    case ADD_PRODUCT: {
      // Add item to cartItems array
      const newItems = [...state.cartItems, action.product];
      // Update cartTotal amount
      const newTotal = state.cartTotal + +action.product.price;
      return {
        ...state,
        cartItems: newItems,
        cartTotal: newTotal,
      };
    }
    case EDIT_PRODUCT: {
      const oldCart = [...state.cartItems];
      const updatedCart = oldCart.filter(
        (item) => item.id !== action.product.id
      );
      updatedCart.push(action.product);
      return {
        ...state,
        cartItems: updatedCart,
      };
    }
    case DELETE_ITEM: {
      const filteredItems = state.cartItems.filter(
        (item) => item.id !== action.product.id
      );
      const deletedTotal = state.cartTotal - +action.product.price;
      return {
        ...state,
        cartItems: filteredItems,
        cartTotal: deletedTotal,
      };
    }
    case PURCHASE_INTENT:
      return {
        ...state,
        clientSecret: action.clientSecret.clientSecret,
      };
    // case SEND_ORDER:
    //payload coming in for sendorder are the cartitems that were just posted as a cart to backend
    //do we want to just return
    default:
      return state;
  }
}
