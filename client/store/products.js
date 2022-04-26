import axios from "axios";

const GET_PRODUCTS = "GET_PRODUCTS";
const GET_FEATURED = "GET_FEATURED";
const CREATE_PRODUCT = "CREATE_PRODUCT"

const _getProducts = (products) => ({
  type: GET_PRODUCTS,
  products,
});

const _getFeatured = (products) => ({
  type: GET_FEATURED,
  products,
});

const _createProduct = (product) => ({
  type: CREATE_PRODUCT,
  product
})

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

export const getFeatured = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/products/?filter=featured");
      dispatch(_getFeatured(data));
    } catch (err) {
      console.error("Unable to fetch featured products...", err);
    }
  };
};

export const createProduct = (product) => {
  return async (dispatch) => {
    try {
      const { data: createdProduct } = await axios.post('api/products', product)
      dispatch(_createProduct(createdProduct))
    } catch (err) {
      console.log('Unable to create product', err)
    }
  }
}

export default function productsReducer(state = [], action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
    case GET_FEATURED:
      return action.products;
    case CREATE_PRODUCT:
      return action.product
    default:
      return state;
  }
}
