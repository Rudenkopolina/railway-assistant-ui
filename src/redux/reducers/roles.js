import { roles as initialState } from '../initialState';
import {
  GET_ROLES,
  GET_ROLES_SUCCESS,
  GET_ROLES_FAIL,
  CREATE_ROLE,
  CREATE_ROLE_SUCCESS,
  CREATE_ROLE_FAIL,
  CHANGE_ROLE,
  CHANGE_ROLE_SUCCESS,
  CHANGE_ROLE_FAIL,
} from '../actions/roles';

export default function (state = initialState, action) {
  switch (action.type) {
	case GET_ROLES:
	case CREATE_ROLE:
  case CHANGE_ROLE:
    return {
      ...state,
      pending: true,
      failed: false
    };

  case CREATE_ROLE_SUCCESS:
    return {
      ...state,
      pending: false,
      roles: [...state.roles, action.role]
    };

  case CHANGE_ROLE_SUCCESS:
  let newRoles = state.roles.map(item => (
    item.id === action.data.id ? action.data : item
  ));
    return {
      ...state,
      pending: false,
      roles: newRoles
    };

  case GET_ROLES_SUCCESS:
    return {
      ...state,
      pending: false,
      roles: action.roles
    };

	case GET_ROLES_FAIL:
	case CREATE_ROLE_FAIL:
  case CHANGE_ROLE_FAIL:
    return {
      ...state,
      pending: false,
      failed: true
    };

  default:
    return state;
  }
}
