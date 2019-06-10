import { categories as initialState } from '../initialState';
import {
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAIL,
  CREATE_CATEGORIES,
  CREATE_CATEGORIES_SUCCESS,
  CREATE_CATEGORIES_FAIL,
  DELETE_CATEGORIES,
  DELETE_CATEGORIES_SUCCESS,
  DELETE_CATEGORIES_FAIL
} from '../actions/categories';

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
    case CREATE_CATEGORIES:
    case DELETE_CATEGORIES:
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

    case CREATE_CATEGORIES_SUCCESS:
      return {
        ...state,
        pending: false,
        categories: [...state.categories, action.responses]
      };

    case DELETE_CATEGORIES_SUCCESS:
      const newCategories = state.categories.filter(
        item => item.id !== action.deleteId
      );
      return {
        ...state,
        pending: false,
        categories: newCategories
      };

    case GET_CATEGORIES_FAIL:
    case CREATE_CATEGORIES_FAIL:
    case DELETE_CATEGORIES_FAIL:
      return {
        ...state,
        pending: false,
        failed: true
      };

    default:
      return state;
  }
}
