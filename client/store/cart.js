import axios from "axios";

const ADD_PRODUCT = "ADD_PRODUCT";

// const _addProduct = (product) => ({
//   type: ADD_PRODUCT,
//   product,
// });

// export const addProduct = (productId) => {
//   return async (dispatch) => {
//     try {
//       const { data } = await axios.get(`/api/products/${productId}`);
//       dispatch(getProduct(data));
//     } catch (err) {
//       console.error("Unable to fetch product...", err);
//     }
//   };
// };
// const initialState = [];

const initialState = {
  cartItems: [],
  cartTotal: 0,
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT:
      // Add item to cartItems array
      const newItems = [...state.cartItems, action.payload];
      // Update cartTotal amount
      const newTotal = state.cartTotal + +action.payload.price;
      return {
        cartItems: newItems,
        cartTotal: newTotal,
      };
    default:
      return state;
  }
}
