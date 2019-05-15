import React from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { Icon } from 'semantic-ui-react'
import 'react-notifications/lib/notifications.css';
import Spinner from './spinner.js';
import axios from 'axios';
import cx from 'classnames';
import './Answer.css';


const axiosInstance = axios.create({ baseURL: 'http://localhost:5000' });
const config = {
  headers: {'Access-Control-Allow-Origin': 'http://127.0.0.1:3000', 'content-type': 'application/json' }
}

class AnswerTable extends React.Component {
  state = {
    data: [],
    editDataId: null,
    prevData: [],
    isLoading: true,
    playedId: null
  }

  componentWillMount() {
    this.getAllAnswers();
  }

  componentDidUpdate(prevProps, prevState) {
    const { editDataId } = this.state;
    const { title } = this.props;
    if (prevProps.title !== title) {
      this.setState({ isLoading: true });
      this.getAllAnswers();
    }
    if (prevState.editDataId !== editDataId && editDataId !== null) {
      document.getElementById(`text-${editDataId}`).focus();
    }
  }

  getAllAnswers = () => {
    const { title } = this.props;
    axiosInstance.get(`/api/answers/${title}s`, config)
    .then(res => this.setState({ data: res.data, prevData: [...res.data], isLoading: false }))
    .catch(err => NotificationManager.error('Something go wrong. Reload page, please.', 'Sorry :('))
  }

  onUpdateAnswer = (id, index) => {
    const { title } = this.props;
    const data = this.state.data[index];
    axiosInstance.post(`/api/answers/${title}`, config, { data })
    .then(res => {
      this.setState({ prevData: [...this.state.data], editDataId: null })
      NotificationManager.success('Answer has been updated!');
    })
    .catch(err => {
      this.setState({ prevData: [...this.state.data], editDataId: null })
      NotificationManager.error('Something go wrong, try again.', 'Sorry :(');
    });
  }

  editDataAnswer = (id, index) => {
    const { editDataId, data, prevData } = this.state;
    if (editDataId === id) {
      const newData = data;
      newData[index] = prevData[index];
      this.setState({ editDataId: null, data: newData });
    } else {
      this.setState({ editDataId: id });
    }
  }

  handleChangeAnswer = (event, index) => {
    const newData = this.state.data;
    newData[index] = {...newData[index], transcription: event.target.value}
    this.setState({ data: newData })
  }

  onPlayAudio = id => {
    const { playedId } = this.state;
    if (playedId) {
      this.onStopAudio(playedId);
    }
    const audio = document.getElementById(`audio-${id}`)
    audio.currentTime = 0;
    audio.play();
    this.setState({ playedId: id });
    audio.onended = () => this.setState({ playedId: null });
  }

  onStopAudio = id => {
    document.getElementById(`audio-${id}`).pause();
    this.setState({ playedId: null });
  }

  render() {
    const { title } = this.props;
    const { prevData, data, editDataId, isLoading } = this.state;
    return (
      <div className={cx('table-container', { 'loading': isLoading })}>
      {isLoading && (
        <div className="table-spinner">
          <Spinner />
        </div>
      )}
      <NotificationContainer />
        {this.state.data.map((answer, index) => (
          <div className="table-row"  key={index}>
            <div className="table-number">{answer.id}</div>
            {editDataId === answer.id ? (
              <textarea
                id={`text-${answer.id}`}
                className="table-textarea"
                value={answer.transcription}
                onChange={(e) => this.handleChangeAnswer(e, index)}
              />
            ) : (
              <div className="table-content">
                {answer.transcription}
              </div>
            )}
            {title === 'audio' && (
              <div>
              {this.state.playedId === answer.id ?
                <Icon name="pause" onClick={() => this.onStopAudio(answer.id)}/> :
                <Icon name="play" onClick={() => this.onPlayAudio(answer.id)}/>
              }
                <audio preload='none' id={`audio-${answer.id}`} onended={() => this.onStopAudio(answer.id)}>
                  <source src='http://172.16.6.253:1000/api/answers/audios/1/66ba5c5cee3804470cd47854836ff4ea' type="audio/ogg" />
                </audio>
              </div>
            )}
            <div className="table-action">
            {prevData[index].transcription !== data[index].transcription ? (
              <div
                className="table-button save-button"
                onClick={()=> this.onUpdateAnswer(answer.id, index)}
              >
                Save
              </div>
            ) : (
              <div className="no-button" />
            )}
            </div>
            <div className="table-action">
              <div
                className="table-button"
                onClick={() => this.editDataAnswer(answer.id, index)}
              >
                {(editDataId === answer.id ||
                  prevData[index].transcription !== data[index].transcription) ? 'Undo' : 'Edit'}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default AnswerTable;
