import request from '../../services/request';
import { urls } from '../../config';

export const GET_MONITORING = 'GET_MONITORING';
export const GET_MONITORING_SUCCESS = 'GET_MONITORING_SUCCESS';
export const GET_MONITORING_FAIL = 'GET_MONITORING_FAIL';

export const UPDATE_MONITORING_ITEM = 'UPDATE_MONITORING_ITEM';
export const UPDATE_MONITORING_ITEM_SUCCESS = 'UPDATE_MONITORING_ITEM_SUCCESS';
export const UPDATE_MONITORING_ITEM_FAIL = 'UPDATE_MONITORING_ITEM_FAIL';

export function getMonitoring() {
  return async dispatch => {
    dispatch({
      type: GET_MONITORING
    });

    try {
      const response = await request(urls.responses.getMonitoring);

      dispatch({
        type: GET_MONITORING_SUCCESS,
        monitoring: response.monitoring
      });
    } catch (err) {
      dispatch({
        type: GET_MONITORING_FAIL
      });
    }
  };
}

export function updateMonitoringItem(id) {
  return async dispatch => {
    dispatch({
      type: UPDATE_MONITORING_ITEM,
      updatingItemId: id
    });

    try {
      const response = await request(urls.responses.getMonitoringItem(id));

      dispatch({
        type: UPDATE_MONITORING_ITEM_SUCCESS,
        monitoring: response.monitoring
      });
    } catch (err) {
      dispatch({
        type: UPDATE_MONITORING_ITEM_FAIL
      });
    }
  };
}