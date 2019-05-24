import { auth as initialState } from '../initialState';
import {
  GET_CURRENT_USER,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_FAIL,
  LOGIN,
  LOGIN_FAIL,
  REGISTER,
  REGISTER_FAIL,
  LOGOUT
} from '../actions/auth';

export default function (state = initialState, action) {
  switch (action.type) {
	case GET_CURRENT_USER:
	case LOGIN:
	case REGISTER:
      return {
        ...initialState,
        pending: true
      };

	case GET_CURRENT_USER_SUCCESS:
      return {
        ...initialState,
        finished: true,
        user: action.user
      };

	case GET_CURRENT_USER_FAIL:
	case LOGIN_FAIL:
	case REGISTER_FAIL:
      return {
        ...initialState,
        finished: true
      };

    case LOGOUT:
      return {
        ...initialState
      };

    default:
      return state;
  }
}
