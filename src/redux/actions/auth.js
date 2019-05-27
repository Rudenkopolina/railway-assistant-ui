import request from '../../services/request';
import { urls } from '../../config';
import  auth  from '../../services/auth';
export const GET_CURRENT_USER = 'GET_CURRENT_USER';
export const GET_CURRENT_USER_SUCCESS = 'GET_CURRENT_USER_SUCCESS';
export const GET_CURRENT_USER_FAIL = 'GET_CURRENT_USER_FAIL';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export const REGISTER = 'REGISTER';
export const REGISTER_FAIL = 'REGISTER_FAIL';

export const LOGOUT = 'LOGOUT';



export function getCurrentUser() {
  return async dispatch => {
    dispatch({
      type: GET_CURRENT_USER
    });

    try {
      const response = await request(urls.auth.currentUser, { method: 'GET'} );

      dispatch({
        type: GET_CURRENT_USER_SUCCESS,
        user: response.user
      });

    } catch (err) {
      dispatch({
        type: GET_CURRENT_USER_FAIL
      });
    }
  };
}

export function login(email, password) {
  return async dispatch => {
    dispatch({
      type: LOGIN
    });
    try {
      const response = await request(urls.auth.login, { method: 'POST',  headers: { "Authorization":'Basic ' + new Buffer.from(email + ':' + password).toString('base64')} });
      auth.setToken(response.token);
      dispatch(getCurrentUser());
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL
      });
    }
  };
}

export function register(username, email, password) {
  return async dispatch => {

    dispatch({
      type: REGISTER
    });

    try {
      const response = await request(urls.auth.signup, { method: 'POST', body: { username, email, password } });

      auth.setToken(response.token);

      dispatch(getCurrentUser());
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL
      });
    }
  };
}


export function logout() {
  return {
    type: LOGOUT
  };
}
