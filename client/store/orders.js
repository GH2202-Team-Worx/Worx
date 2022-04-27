import axios from "axios";

const GET_ORDERS = "GET_ORDERS";

const GET_USER_ORDERS = 'GET_USER_ORDERS'

const _getOrders = (orders) => ({
  type: GET_ORDERS,
  orders,
});

const _getUserOrders = (userOrders) => ({
  type: GET_USER_ORDERS,
  userOrders
})

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

export const getUserOrders = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/${userId}`)
      dispatch(_getUserOrders(data))
    } catch (err) {
      console.log('Unable to fetch orders...', err)
    }
  }
}

export default function ordersReducer(state = [], action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders;
    case GET_USER_ORDERS:
      console.log('getuserorders', action)
      return action.userOrders
    default:
      return state;
  }
}
