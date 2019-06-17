import { environment as initialState } from '../initialState';
import {GET_ENVIRONMENT,GET_ENVIRONMENT_FAIL, GET_ENVIRONMENT_SUCCESS} from "../actions/environment";

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ENVIRONMENT:
      return {
        ...state,
        pending: false,
        environment: []
      };
    case GET_ENVIRONMENT_SUCCESS:
      return {
        ...state,
        pending: false,
        environment: action.environment
      };
    case GET_ENVIRONMENT_FAIL:
      return {
        ...state,
        pending: false,
        environment: []
      };

    default:
      return state;
  }
}
