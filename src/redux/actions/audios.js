export const PLAY_AUDIO = 'PLAY_AUDIO';
export const STOP_AUDIO = 'STOP_AUDIO';

export function playAudio(id, url) {
  return async dispatch => {
    dispatch({
      type: PLAY_AUDIO,
      url,
      id
    });
  };
}

export function stopAudio() {
  return async dispatch => {
    dispatch({
      type: STOP_AUDIO
    });
  };
}
