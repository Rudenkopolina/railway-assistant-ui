import React from 'react';
import { withRouter } from 'react-router-dom';
import { ReactMic } from 'react-mic';
import { Icon, Button } from 'semantic-ui-react';
import './styles.css';
import { LABELS } from '../../../../constants/labels_en';

export class AudioRecorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recordedBlob: null,
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
      this.setState({
        blobObject: reader.result.split(',')[1],
        recordedBlob: blobObject.blobURL
      });
    };
  };

  render() {
    const { blobObject, isRecording, recordedBlob } = this.state;
    return (
      <>
        {!blobObject && (
          <div className='recorder-container'>
            <div className='recorder'>
              <ReactMic
                record={isRecording}
                className='sound-wave'
                onStop={this.onStop}
                onData={this.onData}
                onSave={this.onSave}
                strokeColor='#436dd2'
                backgroundColor='#dde5fa'
              />
            </div>
            <div className='rexorder-actions'>
              <Button
                basic
                color='blue'
                disabled={isRecording}
                className='recorder-action'
                onClick={this.startRecording}
              >
                <Icon name='microphone' /> {LABELS.START_RECORD}
              </Button>
              <Button
                basic
                color='blue'
                disabled={!isRecording}
                className='recorder-action'
                onClick={this.stopRecording}
              >
                <Icon name='stop' />
                {LABELS.STOP_RECORD}
              </Button>
            </div>
          </div>
        )}
        {blobObject && (
          <div className='recorder-container'>
            <div className='audio-player'>
              <audio ref='audioSource' controls='controls' src={recordedBlob} />
            </div>
            <div className='rexorder-actions'>
              <Button
                basic
                color='blue'
                className='recorder-action'
                onClick={this.deleteRecording}
              >
                <Icon name='trash' />
                {LABELS.RERECORD}
              </Button>
              <Button
                basic
                color='blue'
                className='recorder-action'
                onClick={this.saveRecording}
              >
                <Icon name='save outline' />
                {LABELS.SAVE_RECORD}
              </Button>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default withRouter(AudioRecorder);
