import axios from "axios";

const GET_ORDERS = "GET_ORDERS";
const GET_ORDER = "GET_ORDER";

const _getOrders = (orders) => ({
  type: GET_ORDERS,
  orders,
});

const _getOrder = (order) => ({
  type: GET_ORDER,
  order,
});

export const getOrders = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/orders");
      dispatch(_getOrders(data));
    } catch (err) {
      console.log("Unable to fetch orders...");
    }
  };
};

export const getOrder = (orderId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/orders/${orderId}`);
      dispatch(_getOrder(data));
    } catch (err) {
      console.log("Unable to fetch order...");
    }
  };
};

export default function ordersReducer(state = [], action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders;
    default:
      return state;
  }
}
