import { users as initialState } from '../initialState';
import {
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from '../actions/users';

export default function (state = initialState, action) {
  switch (action.type) {
	case GET_USERS:
	case CREATE_USER:
  case DELETE_USER:
    return {
      ...state,
      pending: true,
      failed: false
    };

  case CREATE_USER_SUCCESS:
    return {
      ...state,
      pending: false,
      users: [...state.users, action.user]
    };

  case DELETE_USER_SUCCESS:
  const newUsers = state.users.filter(item => item.id !== action.deleteId);
    return {
      ...state,
      pending: false,
      users: newUsers
    };

  case GET_USERS_SUCCESS:
    return {
      ...state,
      pending: false,
      users: action.users
    };

	case GET_USERS_FAIL:
	case CREATE_USER_FAIL:
  case DELETE_USER_FAIL:
    return {
      ...state,
      pending: false,
      failed: true
    };

  default:
    return state;
  }
}
