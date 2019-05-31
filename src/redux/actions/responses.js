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

export const CREATE_RESPONSE = 'CREATE_RESPONSE';
export const CREATE_RESPONSE_SUCCESS = 'CREATE_RESPONSE_SUCCESS';
export const CREATE_RESPONSE_FAIL = 'CREATE_RESPONSE_FAIL';

export const DELETE_RESPONSE = 'DELETE_RESPONSE';
export const DELETE_RESPONSE_SUCCESS = 'DELETE_RESPONSE_SUCCESS';
export const DELETE_RESPONSE_FAIL = 'DELETE_RESPONSE_FAIL';


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
      const response = await request(url, { method: 'POST',  body: { ...data } });
      dispatch({
        type: CHANGE_RESPONSE_SUCCESS,
        response: response.value,
        title
      });

    } catch (err) {
      dispatch({
        type: CHANGE_RESPONSE_FAIL
      });
    }
  };
}

export function createResponse(data) {
  return async dispatch => {
    dispatch({
      type: CREATE_RESPONSE
    });

    try {
      const response = await request(urls.responses.createReferenceResponse, { method: 'POST',  body: { ...data } });
      dispatch({
        type: CREATE_RESPONSE_SUCCESS,
        response: response.value
      });

    } catch (err) {
      dispatch({
        type: CREATE_RESPONSE_FAIL
      });
    }
  };
}

export function deleteResponse(id) {
  return async dispatch => {
    dispatch({
      type: DELETE_RESPONSE
    });

    try {
      await request(urls.responses.deleteReferenceResponse(id), { method: 'DELETE' });
      dispatch({
        type: DELETE_RESPONSE_SUCCESS,
        deleteId: id
      });

    } catch (err) {
      dispatch({
        type: DELETE_RESPONSE_FAIL
      });
    }
  };
}
