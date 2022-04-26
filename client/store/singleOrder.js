import axios from "axios";

const GET_ORDER = "GET_ORDER";

const _getOrder = (order) => ({
  type: GET_ORDER,
  order,
});

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

export default function orderReducer(state = [], action) {
  switch (action.type) {
    case GET_ORDER:
      return action.order;
    default:
      return state;
  }
}
