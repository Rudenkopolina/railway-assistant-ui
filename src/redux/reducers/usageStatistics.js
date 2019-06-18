import { usageStatistics as initialState } from '../initialState';
import {
  GET_SPEECH_TO_TEXT_STATISTICS,
  GET_SPEECH_TO_TEXT_STATISTICS_SUCCESS,
  GET_SPEECH_TO_TEXT_STATISTICS_FAIL,
  GET_TEXT_TO_SPEECH_STATISTICS,
  GET_TEXT_TO_SPEECH_STATISTICS_SUCCESS,
  GET_TEXT_TO_SPEECH_STATISTICS_FAIL,
  GET_TEXT_PROCESSOR_STATISTICS,
  GET_TEXT_PROCESSOR_STATISTICS_SUCCESS,
  GET_TEXT_PROCESSOR_STATISTICS_FAIL
} from '../actions/usageStatistics';

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SPEECH_TO_TEXT_STATISTICS:
      return {
        ...state,
        pending: true,
        speechToText: []
      };
    case GET_SPEECH_TO_TEXT_STATISTICS_SUCCESS:
      return {
        ...state,
        pending: false,
        speechToText: action.speechToText
      };
    case GET_SPEECH_TO_TEXT_STATISTICS_FAIL:
      return {
        ...state,
        pending: false,
        speechToText: []
      };
    case GET_TEXT_TO_SPEECH_STATISTICS:
      return {
        ...state,
        pending: true,
        textToSpeech: []
      };
    case GET_TEXT_TO_SPEECH_STATISTICS_SUCCESS:
      return {
        ...state,
        pending: false,
        textToSpeech: action.textToSpeech
      };
    case GET_TEXT_TO_SPEECH_STATISTICS_FAIL:
      return {
        ...state,
        pending: false,
        textToSpeech: []
      };
    case GET_TEXT_PROCESSOR_STATISTICS:
      return {
        ...state,
        pending: true,
        textProcessor: []
      };
    case GET_TEXT_PROCESSOR_STATISTICS_SUCCESS:
      return {
        ...state,
        pending: false,
        textProcessor: action.textProcessor
      };
    case GET_TEXT_PROCESSOR_STATISTICS_FAIL:
      return {
        ...state,
        pending: false,
        textProcessor: []
      };

    default:
      return state;
  }
}
