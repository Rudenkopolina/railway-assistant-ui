import React from 'react';
import { withRouter } from 'react-router-dom';
import { ReactMic } from 'react-mic';
import { Icon, Button } from 'semantic-ui-react';
import './styles.css';

export class AudioRecorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blobObject: null,
      isRecording: false
    };
  }

  componentDidMount() {
    if (this.props) {
      this.setState((state, props) => ({
        blobObject: props.url
      }));
    }
  }

  startRecording = () => {
    this.setState({ isRecording: true });
  };

  stopRecording = () => {
    this.setState({
      isRecording: false
    });
  };

  deleteRecording = () => {
    this.setState({
      blobObject: null
    });
  };

  saveRecording = () => {
    this.props.onSaveRecord(this.state.blobObject);
    this.setState({
      blobObject: null
    });
  };

  onStop = blobObject => {
    const reader = new FileReader();
    reader.readAsDataURL(blobObject.blob);
    reader.onloadend = () => {
      this.setState({ blobObject: reader.result.split(',')[1] });
    };
  
  };

  render() {
    const { blobObject, isRecording } = this.state;
    return (
      <div>
        {!blobObject && (
          <div className='recorder-container'>
            <ReactMic
              record={isRecording}
              className='sound-wave'
              onStop={this.onStop}
              onData={this.onData}
              onSave={this.onSave}
              strokeColor='#436dd2'
              backgroundColor='#ffffff'
            />
            <div className='rexorder-actions'>
              <Button
                basic
                color='blue'
                disabled={isRecording}
                className='recorder-action'
                onClick={this.startRecording}
              >
                <Icon name='microphone' /> Запись
              </Button>
              <Button
                basic
                color='blue'
                disabled={!isRecording}
                className='recorder-action'
                onClick={this.stopRecording}
              >
                <Icon name='stop' />
                Остановить запись
              </Button>
            </div>
          </div>
        )}
        {blobObject && (
          <div className='recorder-container'>
            <div className='audio-player'>
              <audio ref='audioSource' controls='controls' src={blobObject} />
            </div>
            <div className='rexorder-actions'>
              <Button
                basic
                color='blue'
                className='recorder-action'
                onClick={this.deleteRecording}
              >
                <Icon name='trash' />
                Перезаписать
              </Button>
              <Button
                basic
                color='blue'
                className='recorder-action'
                onClick={this.saveRecording}
              >
                <Icon name='save outline' />
                Сохранить запись
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(AudioRecorder);
