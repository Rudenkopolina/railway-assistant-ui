import { audios as initialState } from '../initialState';
import {
  PLAY_AUDIO,
  STOP_AUDIO
} from '../actions/audios';

export default function (state = initialState, action) {
  switch (action.type) {
  case PLAY_AUDIO:
    return {
      playedId: action.id,
      audioUrl: action.url
    };

  case STOP_AUDIO:
    return {
      playedId: null,
      audioUrl: null
    };

  default:
    return state;
  }
}
