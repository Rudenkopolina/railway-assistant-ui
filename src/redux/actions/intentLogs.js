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

export const CORRECT_INTENTS = 'CORRECT_INTENTS';
export const CORRECT_INTENTS_SUCCESS = 'CORRECT_INTENTS_SUCCESS';
export const CORRECT_INTENTS_FAIL = 'CORRECT_INTENTS_FAIL';

export function getIntents(page, filter) {
  return async dispatch => {
    dispatch({
      type: GET_INTENTS
    });

    try {
      let query = "";

      if (filter.fromDate) query += `&from=${filter.fromDate}`;
      if (filter.toDate) query += `&to=${filter.toDate}`;
      if (filter.source) query += `&source=${filter.source}`;
      if (filter.type) query += `&type=${filter.type}`;
      if (filter.text) query += `&text=${filter.text}`;

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

export function getIntentsPages(filter) {
  return async dispatch => {
    dispatch({
      type: GET_INTENTS_PAGES
    });

    try {
      let query = "";

      if (filter.fromDate) query += `&from=${filter.fromDate}`;
      if (filter.toDate) query += `&to=${filter.toDate}`;
      if (filter.source) query += `&source=${filter.source}`;
      if (filter.type) query += `&type=${filter.type}`;
      if (filter.text) query += `&text=${filter.text}`;

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

export function correctIntents(log, intent) {
  return async dispatch => {
    dispatch({
      type: CORRECT_INTENTS
    });

    try {
      await request(urls.responses.correctIntents, {
        method: "POST",
        body: { "intentId": intent.id, "logId": log.id }
      });

      dispatch({
        type: CORRECT_INTENTS_SUCCESS,
        log: log,
        intent: intent
      });
    } catch (err) {
      dispatch({
        type: CORRECT_INTENTS_FAIL
      });
    }
  };
}