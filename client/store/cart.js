import axios from 'axios';

const ADD_PRODUCT = 'ADD_PRODUCT';
const DELETE_ITEM = 'DELETE_ITEM';
const EDIT_PRODUCT = 'EDIT_PRODUCT';
const SEND_ORDER = 'SEND_ORDER';
const PURCHASE_INTENT = 'PURCHASE_INTENT';

export const _addProduct = (product) => ({
  type: ADD_PRODUCT,
  product,
});

export const _deleteProduct = (product) => ({
  type: DELETE_ITEM,
  product,
});

export const _editProduct = (product) => ({
  type: EDIT_PRODUCT,
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

//addProduct thunk is called only for loggedin users in SingleProduct.Since backend returns cart and product, I only passed the product to _addProduct. That way, guests and loggedin users can both use the _addProduct creator. BLOCKER: cannot sign in to test this
export const addProduct = (userId, product) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/api/orders/cart', {
        userId,
        product,
      });
      dispatch(_addProduct(data.product));
    } catch (err) {
      console.error('😤 Unable to add product', err);
    }
  };
};

export const deleteProduct = (userId, productId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`/api/orders/cart/${productId}`, {
        data: { userId },
      });
      dispatch(_deleteProduct(data));
    } catch (err) {
      console.error('😡 Unable to delete product', err);
    }
  };
};

export const editProduct = (userId, product) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/orders/cart/${product.id}`, {
        userId,
        product,
      });
      dispatch(_editProduct(data.product));
    } catch (err) {
      console.error('😤 Unable to edit product', err);
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
      console.log('intend to purchase worked!!!');
      console.log(data);
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
    case ADD_PRODUCT:
      {// Add item to cartItems array
      let product;
      Array.isArray(action.product)
        ? (product = action.product[0])
        : (product = action.product);
      const newItems = [...state.cartItems, product];
      // Update cartTotal amount
      const newTotal = state.cartTotal + +product.price;

      return {
        ...state,
        cartItems: newItems,
        cartTotal: newTotal,
      };}
    case EDIT_PRODUCT:
      {let product;
      Array.isArray(action.product)
        ? (product = action.product[0])
        : (product = action.product);
      const oldCart = [...state.cartItems];
      const updatedCart = oldCart.filter(
        (item) => item.id !== product.id
      );
      updatedCart.push(product);
      return {
        ...state,
        cartItems: updatedCart,
      };}
    case DELETE_ITEM:
      {let product;
      Array.isArray(action.product)
        ? (product = action.product[0])
        : (product = action.product);
      const filteredItems = state.cartItems.filter(
        (item) => item.id !== product.id
      );
      const deletedTotal = state.cartTotal - +product.price;
      return {
        ...state,
        cartItems: filteredItems,
        cartTotal: deletedTotal,
      };}
    case PURCHASE_INTENT:
      return {
        ...state,
        clientSecret: action.clientSecret,
      };
    // case SEND_ORDER:
    //payload coming in for sendorder are the cartitems that were just posted as a cart to backend
    //do we want to just return
    default:
      return state;
  }
}
