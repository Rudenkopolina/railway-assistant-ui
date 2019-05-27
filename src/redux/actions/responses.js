import request from '../../services/request';
import { urls } from '../../config';
export const GET_COMMON_RESPONSES = 'GET_COMMON_RESPONSES';
export const GET_COMMON_RESPONSES_SUCCESS = 'GET_COMMON_RESPONSES_SUCCESS';
export const GET_COMMON_RESPONSES_FAIL = 'GET_COMMON_RESPONSES_FAIL';

export const GET_REFERENCE_RESPONSES = 'GET_REFERENCE_RESPONSES';
export const GET_REFERENCE_RESPONSES_SUCCESS = 'GET_REFERENCE_RESPONSES_SUCCESS';
export const GET_REFERENCE_RESPONSES_FAIL = 'GET_REFERENCE_RESPONSES_FAIL';

export const CHANGE_RESPONSE = 'CHANGE_RESPONSE';
export const CHANGE_RESPONSE_SUCCESS = 'CHANGE_RESPONSE_SUCCESS';
export const CHANGE_RESPONSE_FAIL = 'CHANGE_RESPONSE_FAIL';


export function getCommonResponses() {
  return async dispatch => {
    dispatch({
      type: GET_COMMON_RESPONSES
    });

    try {
      const res = await request(urls.responses.commonResponses);
      dispatch({
        type: GET_COMMON_RESPONSES_SUCCESS,
        responses: res.responses
      });

    } catch (err) {
      dispatch({
        type: GET_COMMON_RESPONSES_FAIL
      });
    }
  };
}

export function getReferenceResponses() {
  return async dispatch => {
    dispatch({
      type: GET_REFERENCE_RESPONSES
    });

    try {
      const res = await request(urls.responses.referenceResponses);
      dispatch({
        type: GET_REFERENCE_RESPONSES_SUCCESS,
        responses: res.responses
      });

    } catch (err) {
      dispatch({
        type: GET_REFERENCE_RESPONSES_FAIL
      });
    }
  };
}

export function changeResponse(data, id, title) {
  return async dispatch => {
    dispatch({
      type: CHANGE_RESPONSE
    });

    try {
      const url = title === 'common' ?
      urls.responses.updateCommonResponse(id) :
      urls.responses.updateReferenceResponse(id);
      await request(url, { method: 'POST',  body: { ...data } });
      dispatch({
        type: CHANGE_RESPONSE_SUCCESS,
      });

    } catch (err) {
      dispatch({
        type: CHANGE_RESPONSE_FAIL
      });
    }
  };
}
