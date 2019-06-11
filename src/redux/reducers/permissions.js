import { permissions as initialState } from '../initialState';

import {
  GET_PERMISSIONS,
  GET_PERMISSIONS_SUCCESS,
  GET_PERMISSIONS_FAIL
} from '../actions/permissions';

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PERMISSIONS:
      return {
        ...state,
        pending: true,
        failed: false
      };

    case GET_PERMISSIONS_SUCCESS:
      return {
        ...state,
        pending: false,
        permissions: action.privileges
      };

    case GET_PERMISSIONS_FAIL:
      return {
        ...state,
        pending: false,
        failed: true
      };

    default:
      return state;
  }
}
