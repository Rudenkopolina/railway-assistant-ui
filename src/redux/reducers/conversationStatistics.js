import { conversationStatistics as initialState } from '../initialState';
import {
  GET_DISTINCT_CONVERSATIONS_STATISTICS,
  GET_DISTINCT_CONVERSATIONS_STATISTICS_SUCCESS,
  GET_DISTINCT_CONVERSATIONS_STATISTICS_FAIL,
  GET_STEPS_CONVERSATIONS_STATISTICS,
  GET_STEPS_CONVERSATIONS_STATISTICS_SUCCESS,
  GET_STEPS_CONVERSATIONS_STATISTICS_FAIL,
  GET_DURATION_CONVERSATIONS_STATISTICS,
  GET_DURATION_CONVERSATIONS_STATISTICS_SUCCESS,
  GET_DURATION_CONVERSATIONS_STATISTICS_FAIL
} from '../actions/conversationStatistics';

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DISTINCT_CONVERSATIONS_STATISTICS:
      return {
        ...state,
        pending: true,
        distinctConversations: initialState.distinctConversations
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
        distinctConversations: initialState.distinctConversations
      };
    case GET_STEPS_CONVERSATIONS_STATISTICS:
      return {
        ...state,
        pending: true,
        stepsConversations: initialState.stepsConversations
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
        stepsConversations: initialState.stepsConversations
      };

    case GET_DURATION_CONVERSATIONS_STATISTICS:
      return {
        ...state,
        pending: true,
        durationConversations: initialState.durationConversations
      };
    case GET_DURATION_CONVERSATIONS_STATISTICS_SUCCESS:
      return {
        ...state,
        pending: false,
        durationConversations: action.durationConversations
      };
    case GET_DURATION_CONVERSATIONS_STATISTICS_FAIL:
      return {
        ...state,
        pending: false,
        durationConversations: initialState.durationConversations
      };

    default:
      return state;
  };
};