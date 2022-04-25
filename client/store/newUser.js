import Axios from "axios";
import { authenticate } from "./auth";

const ADDING_USER = 'ADDING_User'

export const addingUser = (newUser) => {
  return {
    type: ADDING_USER,
    newUser
  }
}

export const createNewUser = (newUser, history) => {
  return async (dispatch) => {
    const { data } = await Axios.post('/api/users', { ...newUser, isGuest: false })
    dispatch(authenticate(newUser.email, newUser.password, 'login'))
    history.push('/')
  }
}

export default function createUserReducer (state = [], action) {
  switch (action.type) {
    case ADDING_USER:
      return action.newUser
    default:
      return state
  }
}
