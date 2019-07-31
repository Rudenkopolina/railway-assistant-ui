import { monitoring as initialState } from '../initialState';
import {GET_MONITORING, GET_MONITORING_FAIL, GET_MONITORING_SUCCESS, UPDATE_MONITORING_ITEM, UPDATE_MONITORING_ITEM_FAIL, UPDATE_MONITORING_ITEM_SUCCESS} from "../actions/monitoring";

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MONITORING:
      return {
        ...state,
        pending: false,
        items: []
      };
    case GET_MONITORING_SUCCESS:
      action.monitoring.forEach((item) => {
        item.updating = false;
      });

      return {
        ...state,
        pending: false,
        items: action.monitoring
      };
    case GET_MONITORING_FAIL:
      return {
        ...state,
        pending: false,
        items: []
      };
    case UPDATE_MONITORING_ITEM:
      state.items.forEach(item => {
        if (item.id === action.updatingItemId) {
          item.updating = true;
        }
      });

      return {
        ...state,
        pending: false,
      };
    case UPDATE_MONITORING_ITEM_SUCCESS:
      state.items.forEach(item => {
        if (item.id === action.monitoring.id) {
          item.status = action.monitoring.status;
          item.updated = action.monitoring.updated;
          item.description = action.monitoring.description;
          item.icon = action.monitoring.icon;
          item.updating = false;
        }
      });

      return {
        ...state,
        pending: false,
      };
    case UPDATE_MONITORING_ITEM_FAIL:
      state.items.forEach(item => {
        item.updating = false;
      });

      return {
        ...state,
        pending: false
      };
    default:
      return state;
  }
}
