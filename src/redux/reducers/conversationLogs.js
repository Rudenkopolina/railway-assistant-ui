import { conversationLogs as initialState } from '../initialState';
import {
  GET_CONVERSATIONS,
  GET_CONVERSATIONS_FAIL,
  GET_CONVERSATIONS_PAGES_FAIL,
  GET_FILTERED_CONVERSATIONS,
  GET_FILTERED_CONVERSATIONS_FAIL,
  GET_FILTERED_CONVERSATIONS_SUCCESS,
  GET_CONVERSATIONS_PAGES_SUCCESS,
  GET_CONVERSATIONS_SUCCESS,
  GET_CONVERSATIONS_MESSAGES,
  GET_CONVERSATIONS_MESSAGES_SUCCESS,
  GET_CONVERSATIONS_MESSAGES_FAIL
} from '../actions/conversationLogs';

export default function(state = initialState, action) {
  var GET_CONVERSATIONS_PAGES;
  switch (action.type) {
    case GET_CONVERSATIONS:
    case GET_FILTERED_CONVERSATIONS:
      return {
        ...state,
        pending: true
      };
    case GET_CONVERSATIONS_SUCCESS:
      return {
        ...state,
        pending: false,
        conversations: [...state.conversations, ...action.conversations]
      };
    case GET_FILTERED_CONVERSATIONS_SUCCESS:
      return {
        ...state,
        pending: false,
        conversations: action.conversations
      };
    case GET_CONVERSATIONS_FAIL:
    case GET_FILTERED_CONVERSATIONS_FAIL:
      return {
        ...state,
        pending: false
      };
    case GET_CONVERSATIONS_PAGES:
      return {
        ...state,
        pending: true,
        pages: 0
      };
    case GET_CONVERSATIONS_PAGES_SUCCESS:
      return {
        ...state,
        pending: false,
        pages: action.pages
      };
    case GET_CONVERSATIONS_PAGES_FAIL:
      return {
        ...state,
        pending: false,
        pages: 0
      };
    case GET_CONVERSATIONS_MESSAGES:
      return {
        ...state,
        pending: true,
        selectedConversationMessages: []
      };
    case GET_CONVERSATIONS_MESSAGES_SUCCESS:
      return {
        ...state,
        pending: false,
        selectedConversationMessages: action.selectedConversationMessages
      };
    case GET_CONVERSATIONS_MESSAGES_FAIL:
      return {
        ...state,
        pending: false,
        selectedConversationMessages: []
      };

    default:
      return state;
  }
}
