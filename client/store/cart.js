import axios from 'axios';

const ADD_PRODUCT = 'ADD_PRODUCT';
const DELETE_ITEM = 'DELETE_ITEM';
const SEND_ORDER = 'SEND_ORDER';

export const _addProduct = (product) => ({
  type: ADD_PRODUCT,
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

//addProduct thunk is called only for loggedin users in SingleProduct.Since backend returns cart and product, I only passed the product to _addProduct. That way, guests and loggedin users can both use the _addProduct creator. BLOCKER: cannot sign in to test this
export const addProduct = (product) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/api/orders/cart', product);
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

const initialState = {
  cartItems: [],
  cartTotal: 0,
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT:
      // Add item to cartItems array
      const newItems = [...state.cartItems, action.product];
      // Update cartTotal amount
      const newTotal = state.cartTotal + +action.product.price;
      return {
        cartItems: newItems,
        cartTotal: newTotal,
      };
    case DELETE_ITEM:
      const filteredItems = state.cartItems.filter(
        (item) => item.id !== action.product.id
      );
      const deletedTotal = state.cartTotal - +action.product.price;
      return {
        cartItems: filteredItems,
        cartTotal: deletedTotal,
      };
    // case SEND_ORDER:
    //payload coming in for sendorder are the cartitems that were just posted as a cart to backend
    //do we want to just return
    default:
      return state;
  }
}
