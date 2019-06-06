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
} from '../actions/responses';

import { CLEAR_RESPONSES } from '../actions/auth';

export default function (state = initialState, action) {
  switch (action.type) {
	case GET_COMMON_RESPONSES:
	case GET_REFERENCE_RESPONSES:
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

  case CLEAR_RESPONSES:
  return initialState;

  default:
    return state;
  }
}
