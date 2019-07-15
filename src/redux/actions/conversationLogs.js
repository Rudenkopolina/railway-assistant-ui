import request from '../../services/request';
import { urls } from '../../config';

export const GET_CONVERSATIONS = 'GET_CONVERSATIONS';
export const GET_CONVERSATIONS_SUCCESS = 'GET_CONVERSATIONS_SUCCESS';
export const GET_CONVERSATIONS_FAIL = 'GET_CONVERSATIONS_FAIL';

export const GET_FILTERED_CONVERSATIONS = 'GET_FILTERED_CONVERSATIONS';
export const GET_FILTERED_CONVERSATIONS_SUCCESS = 'GET_FILTERED_CONVERSATIONS_SUCCESS';
export const GET_FILTERED_CONVERSATIONS_FAIL = 'GET_FILTERED_CONVERSATIONS_FAIL';

export const GET_CONVERSATIONS_PAGES = 'GET_CONVERSATIONS_PAGES';
export const GET_CONVERSATIONS_PAGES_SUCCESS = 'GET_CONVERSATIONS_PAGES_SUCCESS';
export const GET_CONVERSATIONS_PAGES_FAIL = 'GET_CONVERSATIONS_PAGES_FAIL';

export const GET_CONVERSATIONS_MESSAGES = 'GET_CONVERSATIONS_MESSAGES_PAGES';
export const GET_CONVERSATIONS_MESSAGES_SUCCESS = 'GET_CONVERSATIONS_MESSAGES_SUCCESS';
export const GET_CONVERSATIONS_MESSAGES_FAIL = 'GET_CONVERSATIONS_MESSAGES_FAIL';

export function getConversations(id, initDate) {
  return async dispatch => {
    dispatch({
      type: GET_CONVERSATIONS
    });

    try {
      const response = await request(urls.responses.getConversations(id, initDate));

      dispatch({
        type: GET_CONVERSATIONS_SUCCESS,
        conversations: response.conversations
      });
    } catch (err) {
      dispatch({
        type: GET_CONVERSATIONS_FAIL
      });
    }
  };
}

export function getFilteredConversations(id, initDate) {
  return async dispatch => {
    dispatch({
      type: GET_FILTERED_CONVERSATIONS
    });

    try {
      const response = await request(urls.responses.getConversations(id, initDate));
      dispatch({
        type: GET_FILTERED_CONVERSATIONS_SUCCESS,
        conversations: response.conversations
      });
    } catch (err) {
      dispatch({
        type: GET_FILTERED_CONVERSATIONS_FAIL
      });
    }
  };
}

export function getConversationsPages() {
  return async dispatch => {
    dispatch({
      type: GET_CONVERSATIONS_PAGES
    });

    try {
      const response = await request(urls.responses.getConversationsPages);

      dispatch({
        type: GET_CONVERSATIONS_PAGES_SUCCESS,
        pages: response.pages
      });
    } catch (err) {
      dispatch({
        type: GET_CONVERSATIONS_PAGES_FAIL
      });
    }
  };
}

export function getConversationsMessages(session) {
  return async dispatch => {
    dispatch({
      type: GET_CONVERSATIONS_MESSAGES
    });

    try {
      const response = await request(urls.responses.getConversationsMessages(session));

      dispatch({
        type: GET_CONVERSATIONS_MESSAGES_SUCCESS,
        selectedConversationMessages: response.logs
      });
    } catch (err) {
      dispatch({
        type: GET_CONVERSATIONS_MESSAGES_FAIL
      });
    }
  };
}