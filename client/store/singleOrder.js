import axios from "axios";

const GET_ORDER = "GET_ORDER";
const UPDATE_ORDER = "UPDATE_ORDER";

const _getOrder = (order) => ({
  type: GET_ORDER,
  order,
});

const _updateOrder = (order) => ({
  type: UPDATE_ORDER,
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

export const updateOrder = (orderInfo, orderId) => {
  console.log("ORDERINFO", orderInfo);
  return async (dispatch) => {
    try {
      const { data: updatedOrder } = await axios.put(
        `/api/orders/${orderId}`,
        orderInfo
      );
      dispatch(_updateOrder(updatedOrder));
    } catch (err) {
      console.log("Error from update order thunk");
    }
  };
};

export default function orderReducer(state = {}, action) {
  switch (action.type) {
    case GET_ORDER:
      return action.order;
    case UPDATE_ORDER:
      return action.order;
    default:
      return state;
  }
}
