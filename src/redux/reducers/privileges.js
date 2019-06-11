import { privileges as initialState } from '../initialState';

import {
  GET_PRIVILEGES,
  GET_PRIVILEGES_SUCCESS,
  GET_PRIVILEGES_FAIL,
  CREATE_PRIVILEGES,
  CREATE_PRIVILEGES_SUCCESS,
  CREATE_PRIVILEGES_FAIL,
  CHANGE_PRIVILEGES,
  CHANGE_PRIVILEGES_SUCCESS,
  CHANGE_PRIVILEGES_FAIL
} from '../actions/privileges';

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRIVILEGES:
    case CREATE_PRIVILEGES:
    case CHANGE_PRIVILEGES:
      return {
        ...state,
        pending: true,
        failed: false
      };

    case GET_PRIVILEGES_SUCCESS:
      return {
        ...state,
        pending: false,
        privileges: action.privileges
      };

    case CREATE_PRIVILEGES_SUCCESS:
      return {
        ...state,
        pending: false,
        privileges: [...state.privileges, action.privilege]
      };

    case CHANGE_PRIVILEGES_SUCCESS:
      let newPrivileges = state.privileges.filter(
        privilege => privilege.id !== action.deleteId
      );

      return {
        ...state,
        pending: false,
        privileges: newPrivileges
      };

    case GET_PRIVILEGES_FAIL:
    case CREATE_PRIVILEGES_FAIL:
    case CHANGE_PRIVILEGES_FAIL:
      return {
        ...state,
        pending: false,
        failed: true
      };

    default:
      return state;
  }
}
