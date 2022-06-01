import axios from "axios";
import { authenticate } from "./auth";

const GET_USERS = "GET_USERS";
const SINGLE_USER = "SINGLE_USER";
const ADDING_USER = "ADDING_USER";
const EDIT_USER = "EDIT_USER";
const DELETE_USER = "DELETE_USER";

export const getUsers = (users) => ({ type: GET_USERS, users });

export const singleUser = (data) => ({ type: SINGLE_USER, data });

export const addingUser = (newUser) => {
  return {
    type: ADDING_USER,
    newUser,
  };
};

const _editUser = (user) => {
  return {
    type: EDIT_USER,
    user,
  };
};

export const deleteUser = (user) => {
  return {
    type: DELETE_USER,
    user,
  };
};

export const fetchUsers = () => {
  return async (dispatch) => {
    const { data } = await axios.get("/api/users");
    console.log("DATA: ", data);
    dispatch(getUsers(data));
  };
};

export const fetchSingleUser = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/${id}`);
      dispatch(singleUser(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const createNewUser = (newUser, history) => {
  return async (dispatch) => {
    const { data } = await axios.post("/api/users", {
      ...newUser,
      isGuest: false,
    });
    dispatch(authenticate(newUser.email, newUser.password, "login"));
    history.push("/");
  };
};

export const fetchUpdatedUser = (data) => {
  return async (dispatch) => {
    try {
      console.log("THUNK: ", data.id);
      const { updatedUser } = await axios.put(`/api/users/${data.id}`, {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        isAdmin: data.isAdmin,
      });
      dispatch(_editUser(updatedUser));
    } catch (err) {
      console.log(err);
    }
  };
};

export const DeleteUser = (id) => {
  return async (dispatch) => {
    try {
      const { data: user } = await axios.delete(`/api/users/${id}`);
      dispatch(deleteUser(user));
      dispatch(fetchUsers());
    } catch (err) {
      console.log(err);
    }
  };
};

export default function usersReducer(state = [], action) {
  switch (action.type) {
    case GET_USERS:
      return action.users;
    case SINGLE_USER:
      return action.data;
    case ADDING_USER:
      return action.newUser;
    case EDIT_USER:
      return action.user;
    case DELETE_USER:
      return state.filter((user) => user.id !== action.user.id);
    default:
      return state;
  }
}
