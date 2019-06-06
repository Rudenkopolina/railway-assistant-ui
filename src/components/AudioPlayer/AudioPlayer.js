import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Icon, Popup } from 'semantic-ui-react';

import { stopAudio, playAudio } from '../../redux/actions/audios';
import './styles.css';

class AudioPlayer extends React.Component {

  render() {
    const {
      audios,
      onStopAudio,
      onPlayAudio,
      id,
      url,
      disabled
    } = this.props;
    return (
      <Fragment>
        {audios.playedId === id ? (
          <Popup
            content='Остановить воспроизведение'
            position='bottom center'
            trigger={
              <Icon
                size='large'
                name='pause'
                className='audio-icon'
                onClick={onStopAudio}
              />
            }
          />
        ) : (
          <Popup
            content='Воспроизвести голосовой ответ'
            position='bottom center'
            trigger={
              <Icon
                disabled={disabled}
                size='large'
                name='play circle outline'
                className='audio-icon'
                onClick={() => onPlayAudio(id, url)}
              />
            }
          />
        )}
    </Fragment>
    );
  }
}

const mapStateToProps = ({ audios }) => ({
	audios
});

const mapDispatchToProps = dispatch => ({
	onPlayAudio: (id, url) => dispatch(playAudio(id, url)),
	onStopAudio: () => dispatch(stopAudio())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AudioPlayer));
