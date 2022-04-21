import axios from "axios";

const GET_PRODUCTS = "GET_PRODUCTS";

const _getProducts = (products) => ({
  type: GET_PRODUCTS,
  products,
});

export const getProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/products");
      dispatch(_getProducts(data));
    } catch (err) {
      console.error("Unable to fetch products...", err);
    }
  };
};

export default function productsReducer(state = [], action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}
