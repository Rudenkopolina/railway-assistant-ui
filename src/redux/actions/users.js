import request from '../../services/request';
import { urls } from '../../config';
export const GET_USERS = 'GET_USERS';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAIL = 'GET_USERS_FAIL';

export const CREATE_USER = 'CREATE_USER';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAIL = 'CREATE_USER_FAIL';

export const DELETE_USER = 'DELETE_USER';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAIL = 'DELETE_USER_FAIL';

export function getAllUsers() {
  return async dispatch => {
    dispatch({
      type: GET_USERS
    });

    try {
      const response = await request(urls.responses.getUsers);

      dispatch({
        type: GET_USERS_SUCCESS,
        users: response.users
      });
    } catch (err) {
      dispatch({
        type: GET_USERS_FAIL
      });
    }
  };
}

export function createUser(user) {
  return async dispatch => {
    dispatch({
      type: CREATE_USER
    });
    try {
      const response = await request(urls.responses.createUser, {
        method: 'POST',
        body: { ...user }
      });
      dispatch({
        type: CREATE_USER_SUCCESS,
        users: response.users
      });
    } catch (err) {
      dispatch({
        type: CREATE_USER_FAIL
      });
    }
  };
}

export function deleteUser(id) {
  return async dispatch => {
    dispatch({
      type: DELETE_USER
    });

    try {
      await request(urls.responses.deleteUser(id), { method: 'DELETE' });
      dispatch({
        type: DELETE_USER_SUCCESS,
        deleteId: id
      });
    } catch (err) {
      dispatch({
        type: DELETE_USER_FAIL
      });
    }
  };
}
