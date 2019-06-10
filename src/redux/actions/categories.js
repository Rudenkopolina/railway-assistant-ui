import request from '../../services/request';
import { urls } from '../../config';

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
export const GET_CATEGORIES_FAIL = 'GET_CATEGORIES_FAIL';

export const CREATE_CATEGORIES = 'CREATE_CATEGORIES';
export const CREATE_CATEGORIES_SUCCESS = 'CREATE_CATEGORIES_SUCCESS';
export const CREATE_CATEGORIES_FAIL = 'CREATE_CATEGORIES_FAIL';

export const DELETE_CATEGORIES = 'DELETE_CATEGORIES';
export const DELETE_CATEGORIES_SUCCESS = 'DELETE_CATEGORIES_SUCCESS';
export const DELETE_CATEGORIES_FAIL = 'DELETE_CATEGORIES_FAIL';

export function getCategories() {
  return async dispatch => {
    dispatch({
      type: GET_CATEGORIES
    });

    try {
      const response = await request(urls.responses.getCategories);
      dispatch({
        type: GET_CATEGORIES_SUCCESS,
        responses: response.categories
      });
    } catch (err) {
      dispatch({
        type: GET_CATEGORIES_FAIL
      });
    }
  };
}

export function createCategory(categoryName) {
  return async dispatch => {
    dispatch({
      type: CREATE_CATEGORIES
    });

    try {
      const response = await request(urls.responses.createCategory, {
        method: 'POST',
        body: { category: categoryName }
      });
      dispatch({
        type: CREATE_CATEGORIES_SUCCESS,
        responses: response.category
      });
    } catch (err) {
      dispatch({
        type: CREATE_CATEGORIES_FAIL
      });
    }
  };
}

export function deleteCategory(id) {
  return async dispatch => {
    dispatch({
      type: DELETE_CATEGORIES
    });

    try {
      await request(urls.responses.deleteCategory(id), { method: 'DELETE' });
      dispatch({
        type: DELETE_CATEGORIES_SUCCESS,
        deleteId: id
      });
    } catch (err) {
      dispatch({
        type: DELETE_CATEGORIES_FAIL
      });
    }
  };
}
