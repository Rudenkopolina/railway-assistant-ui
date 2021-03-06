import { intentLogs as initialState } from '../initialState';
import {
  GET_INTENTS,
  GET_INTENTS_FAIL,
  GET_INTENTS_SUCCESS,
  GET_INTENTS_PAGES,
  GET_INTENTS_PAGES_FAIL,
  GET_INTENTS_PAGES_SUCCESS,
  CLEAR_INTENTS,
  CLEAR_INTENTS_SUCCESS,
  CLEAR_INTENTS_FAIL,
  CORRECT_INTENTS,
  CORRECT_INTENTS_FAIL,
  CORRECT_INTENTS_SUCCESS
} from '../actions/intentLogs';

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_INTENTS:
    case CLEAR_INTENTS:
      return {
        ...state,
        pending: true
      };
    case GET_INTENTS_SUCCESS:
      return {
        ...state,
        pending: false,
        intents: [...state.intents, ...action.intents]
      };
    case CLEAR_INTENTS_SUCCESS:
      return {
        ...state,
        pending: false,
        intents: []
      };
    case GET_INTENTS_FAIL:
    case CLEAR_INTENTS_FAIL:
      return {
        ...state,
        pending: false
      };
    case GET_INTENTS_PAGES:
      return {
        ...state,
        pending: true,
        pages: 0
      };
    case GET_INTENTS_PAGES_SUCCESS:
      return {
        ...state,
        pending: false,
        pages: action.pages
      };
    case GET_INTENTS_PAGES_FAIL:
      return {
        ...state,
        pending: false,
        pages: 0
      };
    case CORRECT_INTENTS:
      return {
        ...state
      };
    case CORRECT_INTENTS_SUCCESS:
      state.intents.forEach((element) => {
        if (element.requestText === action.log.requestText) {
          element.correctedIntent = action.intent.name;
          element.correctedIntentDescription = action.intent.description;
        }
      });

      return {
        ...state,
        pending: false,
        intents: state.intents
      };
    case CORRECT_INTENTS_FAIL:
      return {
        ...state
      };
    default:
      return state;
  }
}
