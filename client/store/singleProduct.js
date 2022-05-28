import axios from "axios";

const GET_PRODUCT = "GET_PRODUCT";
const UPDATE_PRODUCT = "UPDATE_PRODUCT";

const _getProduct = (product) => ({
  type: GET_PRODUCT,
  product,
});

const _updateProduct = (product) => ({
  type: UPDATE_PRODUCT,
  product,
});

export const getProduct = (productId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/products/${productId}`);
      dispatch(_getProduct(data));
    } catch (err) {
      console.error("Unable to fetch product...", err);
    }
  };
};

// export const updateProduct = (productInfo, productId) => {
//   console.log("ORDERINFO", orderInfo);
//   return async (dispatch) => {
//     try {
//       const { data: updatedOrder } = await axios.put(
//         `/api/orders/${orderId}`,
//         orderInfo
//       );
//       dispatch(_updatedOrder(updatedOrder));
//     } catch (err) {
//       console.log("Error from update order thunk");
//     }
//   };
// };

export default function productReducer(state = {}, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product;
    default:
      return state;
  }
}
