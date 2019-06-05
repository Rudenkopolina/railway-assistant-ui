import React, { Fragment } from 'react';
import { Icon } from 'semantic-ui-react';
import './styles.css';

class AudioPlayer extends React.Component {

  render() {
    const {
      playedId,
      id,
      onStopAudio,
      onPlayAudio,
      getAudioSrc,
      disabled
    } = this.props;
    return (
      <Fragment>
        {playedId === id ? (
          <Icon
            size='large'
            name='pause'
            className='audio-icon'
            onClick={() => onStopAudio(id)}
          />
        ) : (
          <Icon
            disabled={disabled}
            size='large'
            name='play circle outline'
            className='audio-icon'
            onClick={() => onPlayAudio(id)}
          />
        )}
      <audio
        preload='none'
        id={`audio-${id}`}
        onEnded={() => onStopAudio(id)}
      >
        <source src={getAudioSrc(id)} type='audio/ogg' />
      </audio>
    </Fragment>
    );
  }
}
export default AudioPlayer;
