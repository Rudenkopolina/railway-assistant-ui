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
  CHANGE_RESPONSE_FAIL
} from '../actions/responses';

export default function (state = initialState, action) {
  switch (action.type) {
	case GET_COMMON_RESPONSES:
	case GET_REFERENCE_RESPONSES:
  case CHANGE_RESPONSE:
    return {
      ...state,
      pending: true,
    };

  case CHANGE_RESPONSE_SUCCESS:
    return {
      ...state,
      faild: false,
      pending: false
    };

	case GET_COMMON_RESPONSES_SUCCESS:
    return {
      ...initialState,
      faild: false,
      commonResponses: action.responses
    };

  case GET_REFERENCE_RESPONSES_SUCCESS:
    return {
      ...initialState,
      faild: false,
      referenceResponses: action.responses
    };

	case GET_REFERENCE_RESPONSES_FAIL:
	case GET_COMMON_RESPONSES_FAIL:
  case CHANGE_RESPONSE_FAIL:
    return {
      ...initialState,
      faild: true
    };

  default:
    return state;
  }
}
