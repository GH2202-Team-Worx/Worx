import axios from "axios";

const GET_ORDERS = "GET_ORDERS";

const _getOrders = (orders) => ({
  type: GET_ORDERS,
  orders,
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

export default function ordersReducer(state = [], action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders;
    default:
      return state;
  }
}
