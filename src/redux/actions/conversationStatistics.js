import request from '../../services/request';
import { urls } from '../../config';

export const GET_DISTINCT_CONVERSATIONS_STATISTICS = 'GET_DISTINCT_CONVERSATIONS_STATISTICS';
export const GET_DISTINCT_CONVERSATIONS_STATISTICS_SUCCESS = 'GET_DISTINCT_CONVERSATIONS_STATISTICS_SUCCESS';
export const GET_DISTINCT_CONVERSATIONS_STATISTICS_FAIL = 'GET_DISTINCT_CONVERSATIONS_STATISTICS_FAIL';

export const GET_STEPS_CONVERSATIONS_STATISTICS = 'GET_STEPS_CONVERSATIONS_STATISTICS';
export const GET_STEPS_CONVERSATIONS_STATISTICS_SUCCESS = 'GET_STEPS_CONVERSATIONS_STATISTICS_SUCCESS';
export const GET_STEPS_CONVERSATIONS_STATISTICS_FAIL = 'GET_STEPS_CONVERSATIONS_STATISTICS_FAIL';

export function getDistinctConversationsStatistics() {
  return async dispatch => {
    dispatch({
      type: GET_DISTINCT_CONVERSATIONS_STATISTICS
    });

    try {
      const response = await request(urls.responses.getDistinctConversationsStatistics);

      dispatch({
        type: GET_DISTINCT_CONVERSATIONS_STATISTICS_SUCCESS,
        distinctConversations: response.statistics
      });
    } catch (err) {
      dispatch({
        type: GET_DISTINCT_CONVERSATIONS_STATISTICS_FAIL
      });
    }
  };
}

export function getStepsConversationsStatistics() {
  return async dispatch => {
    dispatch({
      type: GET_STEPS_CONVERSATIONS_STATISTICS
    });

    try {
      const response = await request(urls.responses.getStepsConversationsStatistics);

      dispatch({
        type: GET_STEPS_CONVERSATIONS_STATISTICS_SUCCESS,
        stepsConversations: response.statistics
      });
    } catch (err) {
      dispatch({
        type: GET_STEPS_CONVERSATIONS_STATISTICS_FAIL
      });
    }
  };
}