import Axios from "axios";
import { authenticate } from "./auth";

const UPDATE_USER = "UPDATE_USER";

export const _updateUser = (user) => {
  return {
    type: UPDATE_USER,
    user,
  };
};

export const updateUser = (userInfo, userId) => {
  return async (dispatch) => {
    try {
      const { data: updatedUser } = await axios.put(
        `/api/products/${userId}`,
        userInfo
      );
      dispatch(_updateUser(updatedUser));
    } catch (err) {
      console.log("Error from update user thunk");
    }
  };
};
// const ADDING_USER = "ADDING_USER";

// export const addingUser = (newUser) => {
//   return {
//     type: ADDING_USER,
//     newUser,
//   };
// };

// export const createNewUser = (newUser, history) => {
//   return async (dispatch) => {
//     const { data } = await Axios.post("/api/users", {
//       ...newUser,
//       isGuest: false,
//     });
//     dispatch(authenticate(newUser.email, newUser.password, "login"));
//     history.push("/");
//   };
// };

export default function createUserReducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_USER:
      return action.user;
    default:
      return state;
  }
}
