import request from '../../services/request';
import { urls } from '../../config';

export const GET_INTENTS = 'GET_INTENTS';
export const GET_INTENTS_SUCCESS = 'GET_INTENTS_SUCCESS';
export const GET_INTENTS_FAIL = 'GET_INTENTS_FAIL';

export const CLEAR_INTENTS = 'CLEAR_INTENTS';
export const CLEAR_INTENTS_SUCCESS = 'CLEAR_INTENTS_SUCCESS';
export const CLEAR_INTENTS_FAIL = 'CLEAR_INTENTS_FAIL';

export const GET_INTENTS_PAGES = 'GET_INTENTS_PAGES';
export const GET_INTENTS_PAGES_SUCCESS = 'GET_INTENTS_PAGES_SUCCESS';
export const GET_INTENTS_PAGES_FAIL = 'GET_INTENTS_PAGES_FAIL';

export function getIntents(page, fromDate, toDate, source, type) {
  return async dispatch => {
    dispatch({
      type: GET_INTENTS
    });

    try {
      let query = "";

      if (fromDate) query += `&from=${fromDate}`;
      if (toDate) query += `&to=${toDate}`;
      if (source) query += `&source=${source}`;
      if (type) query += `&type=${type}`;

      const response = await request(urls.responses.getIntents(page, query));

      dispatch({
        type: GET_INTENTS_SUCCESS,
        intents: response.logs
      });
    } catch (err) {
      dispatch({
        type: GET_INTENTS_FAIL
      });
    }
  };
}

export function clearIntents() {
  return async dispatch => {
    dispatch({
      type: CLEAR_INTENTS
    });

    try {
      dispatch({
        type: CLEAR_INTENTS_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: CLEAR_INTENTS_FAIL
      });
    }
  };
}

export function getIntentsPages(fromDate, toDate, source, type) {
  return async dispatch => {
    dispatch({
      type: GET_INTENTS_PAGES
    });

    try {
      let query = "";

      if (fromDate) query += `&from=${fromDate}`;
      if (toDate) query += `&to=${toDate}`;
      if (source) query += `&source=${source}`;
      if (type) query += `&type=${type}`;

      const response = await request(urls.responses.getIntentsPages(query));

      dispatch({
        type: GET_INTENTS_PAGES_SUCCESS,
        pages: response.pages
      });
    } catch (err) {
      dispatch({
        type: GET_INTENTS_PAGES_FAIL
      });
    }
  };
}