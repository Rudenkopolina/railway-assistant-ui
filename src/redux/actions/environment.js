import request from '../../services/request';
import { urls } from '../../config';

export const GET_ENVIRONMENT = 'GET_ENVIRONMENT';
export const GET_ENVIRONMENT_SUCCESS = 'GET_ENVIRONMENT_SUCCESS';
export const GET_ENVIRONMENT_FAIL = 'GET_ENVIRONMENT_FAIL';

export function getEnvironment() {
  return async dispatch => {
    dispatch({
      type: GET_ENVIRONMENT
    });

    try {
      const response = await request(urls.responses.getEnvironment);

      dispatch({
        type: GET_ENVIRONMENT_SUCCESS,
        environment: response.environment
      });
    } catch (err) {
      dispatch({
        type: GET_ENVIRONMENT_FAIL
      });
    }
  };
}