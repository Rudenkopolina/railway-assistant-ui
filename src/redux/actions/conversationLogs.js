import request from '../../services/request';
import { urls } from '../../config';

export const GET_CONVERSATIONS = 'GET_CONVERSATIONS';
export const GET_CONVERSATIONS_SUCCESS = 'GET_CONVERSATIONS_SUCCESS';
export const GET_CONVERSATIONS_FAIL = 'GET_CONVERSATIONS_FAIL';

export const CLEAR_CONVERSATIONS = 'CLEAR_CONVERSATIONS';
export const CLEAR_CONVERSATIONS_SUCCESS = 'CLEAR_CONVERSATIONS_SUCCESS';
export const CLEAR_CONVERSATIONS_FAIL = 'CLEAR_CONVERSATIONS_FAIL';

export const GET_CONVERSATIONS_PAGES = 'GET_CONVERSATIONS_PAGES';
export const GET_CONVERSATIONS_PAGES_SUCCESS = 'GET_CONVERSATIONS_PAGES_SUCCESS';
export const GET_CONVERSATIONS_PAGES_FAIL = 'GET_CONVERSATIONS_PAGES_FAIL';

export const GET_CONVERSATIONS_MESSAGES = 'GET_CONVERSATIONS_MESSAGES_PAGES';
export const GET_CONVERSATIONS_MESSAGES_SUCCESS = 'GET_CONVERSATIONS_MESSAGES_SUCCESS';
export const GET_CONVERSATIONS_MESSAGES_FAIL = 'GET_CONVERSATIONS_MESSAGES_FAIL';

export function getConversations(page, fromDate, toDate, source, type) {
  return async dispatch => {
    dispatch({
      type: GET_CONVERSATIONS
    });

    try {
      let query = "";

      if (fromDate) query += `&from=${fromDate}`;
      if (toDate) query += `&to=${toDate}`;
      if (source) query += `&source=${source}`;
      if (type) query += `&type=${type}`;

      const response = await request(urls.responses.getConversations(page, query));

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

export function clearConversations() {
  return async dispatch => {
    dispatch({
      type: CLEAR_CONVERSATIONS
    });

    try {
      dispatch({
        type: CLEAR_CONVERSATIONS_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: CLEAR_CONVERSATIONS_FAIL
      });
    }
  };
}

export function getConversationsPages(fromDate, toDate, source, type) {
  return async dispatch => {
    dispatch({
      type: GET_CONVERSATIONS_PAGES
    });

    try {
      let query = "";

      if (fromDate) query += `&from=${fromDate}`;
      if (toDate) query += `&to=${toDate}`;
      if (source) query += `&source=${source}`;
      if (type) query += `&type=${type}`;

      const response = await request(urls.responses.getConversationsPages(query));

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