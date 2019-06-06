import request from '../../services/request';
import { urls } from '../../config';

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
export const GET_CATEGORIES_FAIL = 'GET_CATEGORIES_FAIL';

export function getCategories() {
    return async dispatch => {
      dispatch({
        type: GET_CATEGORIES
      });
  
      try {
        const res = await request(urls.responses.getCategories);
        dispatch({
          type: GET_CATEGORIES_SUCCESS,
          responses: res.categories
        });
  
      } catch (err) {
        dispatch({
          type: GET_CATEGORIES_FAIL
        });
      }
    };
  }