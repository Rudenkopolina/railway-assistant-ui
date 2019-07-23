import { availableIntents as initialState } from '../initialState';
import {
  GET_AVAILABLE_INTENTS,
  GET_AVAILABLE_INTENTS_SUCCESS,
  GET_AVAILABLE_INTENTS_FAIL
} from '../actions/availableIntents';

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_AVAILABLE_INTENTS:
      return {
        ...state,
        pending: false,
        intents: []
      };
    case GET_AVAILABLE_INTENTS_SUCCESS:
      return {
        ...state,
        pending: false,
        intents: action.intents
      };
    case GET_AVAILABLE_INTENTS_FAIL:
    default:
      return state;
  }
}
