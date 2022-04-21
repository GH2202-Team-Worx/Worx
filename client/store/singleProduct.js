import axios from 'axios';

const GET_PRODUCT = 'GET_PRODUCT';

const getProduct = (product) => ({
  type: GET_PRODUCT,
  product,
});

export const fetchProduct = (productId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/products/${productId}`);
      dispatch(getProduct(data));
    } catch (err) {
      console.error('Unable to fetch product...', err);
    }
  };
};

export default function productReducer(state = {}, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product;
    default:
      return state;
  }
}
