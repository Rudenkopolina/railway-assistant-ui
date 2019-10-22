import request from '../../services/request';
import { urls } from '../../config';

export const GET_AVAILABLE_INTENTS = 'GET_AVAILABLE_INTENTS';
export const GET_AVAILABLE_INTENTS_SUCCESS = 'GET_AVAILABLE_INTENTS_SUCCESS';
export const GET_AVAILABLE_INTENTS_FAIL = 'GET_AVAILABLE_INTENTS_FAIL';

export function getAvailableIntents() {
  return async dispatch => {
    dispatch({
      type: GET_AVAILABLE_INTENTS
    });

    try {
      const response = await request(urls.responses.getAvailableIntents);
      dispatch({
        type: GET_AVAILABLE_INTENTS_SUCCESS,
        intents: response.intents
      });
    } catch (err) {
      dispatch({
        type: GET_AVAILABLE_INTENTS_FAIL
      });
    }
  };
}