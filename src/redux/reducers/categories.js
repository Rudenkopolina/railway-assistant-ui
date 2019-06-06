import { categories as initialState } from '../initialState';
import {
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAIL
} from '../actions/categories';

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        pending: true,
        failed: false
      };

    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        pending: false,
        categories: action.responses
      };

    case GET_CATEGORIES_FAIL:
      return {
        ...state,
        pending: false,
        failed: true
      };

    default:
      return state;
  }
}
