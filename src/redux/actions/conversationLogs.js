import request from '../../services/request';
import { urls } from '../../config';

export const GET_CONVERSATIONS = 'GET_CONVERSATIONS';
export const GET_CONVERSATIONS_SUCCESS = 'GET_CONVERSATIONS_SUCCESS';
export const GET_CONVERSATIONS_FAIL = 'GET_CONVERSATIONS_FAIL';

export const GET_CONVERSATIONS_PAGES = 'GET_CONVERSATIONS_PAGES';
export const GET_CONVERSATIONS_PAGES_SUCCESS = 'GET_CONVERSATIONS_PAGES_SUCCESS';
export const GET_CONVERSATIONS_PAGES_FAIL = 'GET_CONVERSATIONS_PAGES_FAIL';

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