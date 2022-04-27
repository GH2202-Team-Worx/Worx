import axios from "axios";

const GET_USERS = "GET_USERS";

export const getUsers = (users) => ({ type: GET_USERS, users });

export const fetchUsers = () => {
  return async (dispatch) => {
    const { data } = await axios.get("/api/users");
    dispatch(getUsers(data));
  };
};

const SINGLE_USER = "SINGLE_USER";

export const singleUser = (data) => ({ type: SINGLE_USER, data });

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

const EDIT_USER = "EDIT_USER";

const _editUser = (user) => {
  return {
    type: EDIT_USER,
    user,
  };
};

export const fetchUpdatedUser = (data) => {
  return async (dispatch) => {
    try {
      const { updatedUser } = await axios.put(`/api/users/${data.id}`, { firstName: data.firstName, lastName: data.lastName, email: data.email, phone: data.phone, address: data.address, isAdmin: data.isAdmin})
      dispatch(_editUser(updatedUser))
    } catch (err) {
      console.log(err);
    }
  };
};

const DELETE_USER = 'DELETE_USER'

export const deleteUser = (user) => {
  return {
    type: DELETE_USER,
    user
  }
}

export const DeleteUser = (id) => {
  return async (dispatch) => {
    try {
      const { data: user } = await axios.delete(`/api/users/${id}`)
      dispatch(deleteUser(user))
      dispatch(fetchUsers())
    } catch (err) {
      console.log(err)
    }
  }
}

export default function usersReducer (state = [], action) {
  switch (action.type) {
    case GET_USERS:
      return action.users;
    case SINGLE_USER:
      return action.data
    case DELETE_USER:
      return state.filter((user) => user.id !== action.user.id)
    default:
      return state;
  }
}
