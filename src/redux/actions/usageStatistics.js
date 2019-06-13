import request from '../../services/request';
import { urls } from '../../config';

export const GET_SPEECH_TO_TEXT_STATISTICS = 'GET_SPEECH_TO_TEXT_STATISTICS';
export const GET_SPEECH_TO_TEXT_STATISTICS_SUCCESS = 'GET_SPEECH_TO_TEXT_STATISTICS_SUCCESS';
export const GET_SPEECH_TO_TEXT_STATISTICS_FAIL = 'GET_SPEECH_TO_TEXT_STATISTICS_FAIL';

export const GET_TEXT_TO_SPEECH_STATISTICS = 'GET_TEXT_TO_SPEECH_STATISTICS';
export const GET_TEXT_TO_SPEECH_STATISTICS_SUCCESS = 'GET_TEXT_TO_SPEECH_STATISTICS_SUCCESS';
export const GET_TEXT_TO_SPEECH_STATISTICS_FAIL = 'GET_TEXT_TO_SPEECH_STATISTICS_FAIL';

export const GET_TEXT_PROCESSOR_STATISTICS = 'GET_TEXT_PROCESSOR_STATISTICS';
export const GET_TEXT_PROCESSOR_STATISTICS_SUCCESS = 'GET_TEXT_PROCESSOR_STATISTICS_SUCCESS';
export const GET_TEXT_PROCESSOR_STATISTICS_FAIL = 'GET_TEXT_PROCESSOR_STATISTICS_FAIL';

export function getSpeechToTextStatistics() {
  return async dispatch => {
    dispatch({
      type: GET_SPEECH_TO_TEXT_STATISTICS
    });

    try {
      const response = await request(urls.responses.getSpeechToTextStatistics);

      dispatch({
        type: GET_SPEECH_TO_TEXT_STATISTICS_SUCCESS,
        speechToText: response.statistics
      });
    } catch (err) {
      dispatch({
        type: GET_SPEECH_TO_TEXT_STATISTICS_FAIL
      });
    }
  };
}

export function getTextToSpeechStatistics() {
  return async dispatch => {
    dispatch({
      type: GET_TEXT_TO_SPEECH_STATISTICS
    });

    try {
      const response = await request(urls.responses.getTextToSpeechStatistics);

      dispatch({
        type: GET_TEXT_TO_SPEECH_STATISTICS_SUCCESS,
        textToSpeech: response.statistics
      });
    } catch (err) {
      dispatch({
        type: GET_SPEECH_TO_TEXT_STATISTICS_FAIL
      });
    }
  };
}

export function getTextProcessorStatistics() {
  return async dispatch => {
    dispatch({
      type: GET_TEXT_PROCESSOR_STATISTICS
    });

    try {
      const response = await request(urls.responses.getTextProcessorStatistics);

      dispatch({
        type: GET_TEXT_PROCESSOR_STATISTICS_SUCCESS,
        textProcessor: response.statistics
      });
    } catch (err) {
      dispatch({
        type: GET_TEXT_PROCESSOR_STATISTICS_FAIL
      });
    }
  };
}

