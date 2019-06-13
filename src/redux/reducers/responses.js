import { responses as initialState } from '../initialState';
import {
  GET_COMMON_RESPONSES,
  GET_COMMON_RESPONSES_SUCCESS,
  GET_COMMON_RESPONSES_FAIL,
  GET_REFERENCE_RESPONSES,
  GET_REFERENCE_RESPONSES_SUCCESS,
  GET_REFERENCE_RESPONSES_FAIL,
  CHANGE_RESPONSE,
  CHANGE_RESPONSE_SUCCESS,
  CHANGE_RESPONSE_FAIL,
  CREATE_RESPONSE,
  CREATE_RESPONSE_SUCCESS,
  CREATE_RESPONSE_FAIL,
  DELETE_RESPONSE,
  DELETE_RESPONSE_SUCCESS,
  DELETE_RESPONSE_FAIL,
  MOVE_CATEGORIES,
  MOVE_CATEGORIES_SUCCESS,
  MOVE_CATEGORIES_FAIL
} from '../actions/responses';

import { LOGOUT } from '../actions/auth';

export default function (state = initialState, action) {
  switch (action.type) {
	case GET_COMMON_RESPONSES:
	case GET_REFERENCE_RESPONSES:
	case MOVE_CATEGORIES:
    return {
      ...state,
      pending: true,
      failed: false
    };
  case CHANGE_RESPONSE:
  case CREATE_RESPONSE:
  case DELETE_RESPONSE:
    return {
      ...state,
      pending: true,
      failed: false
    };

  case CHANGE_RESPONSE_SUCCESS:
    const title = `${action.title}Responses`;
    const changedResponses = state[title].map(item => (
      item.id === action.response.id ? action.response : item
    ))
    return {
      ...state,
      pending: false,
      [title]: changedResponses
    };

  case CREATE_RESPONSE_SUCCESS:
    return {
      ...state,
      pending: false,
      referenceResponses: [...state.referenceResponses, action.response]
    };

  case DELETE_RESPONSE_SUCCESS:
  const newResponses = state.referenceResponses.filter(item => item.id !== action.deleteId);
    return {
      ...state,
      pending: false,
      referenceResponses: newResponses
    };

	case GET_COMMON_RESPONSES_SUCCESS:
    return {
      ...state,
      pending: false,
      commonResponses: action.responses
    };

  case GET_REFERENCE_RESPONSES_SUCCESS:
    return {
      ...state,
      pending: false,
      referenceResponses: action.responses
    };
  case MOVE_CATEGORIES_SUCCESS:
    state.referenceResponses.forEach(res => {
      if (action.movedResponseIds.find((el) => el == res.id)) {
        res.categoryId = action.categoryId;
      }
    });

    return {
      ...state,
      pending: false,
      failed: false,
      referenceResponses: state.referenceResponses
    };
	case GET_REFERENCE_RESPONSES_FAIL:
	case GET_COMMON_RESPONSES_FAIL:
  case CHANGE_RESPONSE_FAIL:
  case CREATE_RESPONSE_FAIL:
  case DELETE_RESPONSE_FAIL:
    return {
      ...state,
      pending: false,
      failed: true
    };
  case MOVE_CATEGORIES_FAIL:
    return {
      ...state,
      pending: false,
      failed: true
    };

  case LOGOUT:
  return initialState;

  default:
    return state;
  }
}
