import { conversationStatistics as initialState } from '../initialState';
import {
  GET_DISTINCT_CONVERSATIONS_STATISTICS,
  GET_DISTINCT_CONVERSATIONS_STATISTICS_SUCCESS,
  GET_DISTINCT_CONVERSATIONS_STATISTICS_FAIL,
  GET_STEPS_CONVERSATIONS_STATISTICS,
  GET_STEPS_CONVERSATIONS_STATISTICS_SUCCESS,
  GET_STEPS_CONVERSATIONS_STATISTICS_FAIL
} from '../actions/conversationStatistics';

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DISTINCT_CONVERSATIONS_STATISTICS:
      return {
        ...state,
        pending: true,
        distinctConversations: []
      };
    case GET_DISTINCT_CONVERSATIONS_STATISTICS_SUCCESS:
      return {
        ...state,
        pending: false,
        distinctConversations: action.distinctConversations
      };
    case GET_DISTINCT_CONVERSATIONS_STATISTICS_FAIL:
      return {
        ...state,
        pending: false,
        distinctConversations: []
      };
    case GET_STEPS_CONVERSATIONS_STATISTICS:
      return {
        ...state,
        pending: true,
        stepsConversations: []
      };
    case GET_STEPS_CONVERSATIONS_STATISTICS_SUCCESS:
      return {
        ...state,
        pending: false,
        stepsConversations: action.stepsConversations
      };
    case GET_STEPS_CONVERSATIONS_STATISTICS_FAIL:
      return {
        ...state,
        pending: false,
        stepsConversations: []
      };

    default:
      return state;
  };
};