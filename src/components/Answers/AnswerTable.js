import React from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { Icon } from 'semantic-ui-react'
import TextArea from 'react-textarea-autosize';
import 'react-notifications/lib/notifications.css';
import Spinner from './spinner.js';
import axios from 'axios';
import cx from 'classnames';
import './Answer.css';


const axiosInstance = axios.create({ baseURL: 'http://172.16.6.253:1000' });
const config = {
  headers: {
    'Access-Control-Allow-Origin': 'http://127.0.0.1:3000',
    'content-type': 'application/json',
    'Authorization': 'Bearer a5f291eb66c594a1bee2202070db2f40'
  }
}

class AnswerTable extends React.Component {
  state = {
    data: [],
    prevData: [],
    isLoading: true,
    playedId: null,
    editDataId: null
  }

  componentWillMount() {
    axiosInstance.get(`/api/answers/responses/`, config)
    .then(res => this.setState({ data: res.data.responses, prevData: [...res.data.responses], isLoading: false }))
    .catch(err => NotificationManager.error('Something go wrong. Reload page, please.', 'Sorry :('))
  }

  componentDidUpdate(prevProps, prevState) {
    const { editDataId } = this.state;
    if (prevState.editDataId !== editDataId && editDataId !== null) {
      document.getElementById(`text-${editDataId}`).focus();
    }
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

  handleChangeAnswer = (event, index, title) => {
    const newData = this.state.data;
    newData[index][title] = {...newData[index][title], transcription: event.target.value}
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
    const { prevData, data, isLoading, editDataId } = this.state;
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
                <TextArea
                  id={`text-${answer.id}`}
                  value={answer.text.transcription}
                  className="table-textarea"
                  onChange={(e) => this.handleChangeAnswer(e, index, 'text')}
                />
              ) : (
                <div className="table-content">
                  {answer.text.transcription}
                </div>
              )}
              {editDataId === answer.id ? (
                <TextArea
                  value={answer.audio.transcription}
                  className="table-textarea"
                  onChange={(e) => this.handleChangeAnswer(e, index, 'audio')}
                />
              ) : (
                <div className="table-content">
                  {answer.audio.transcription}
                </div>
              )}
              <div className="table-action">
              {this.state.playedId === answer.audio.id ?
                <Icon
                  size='large'
                  name="pause"
                  className="audio-icon"
                  onClick={() => this.onStopAudio(answer.audio.id)}
                /> :
                <Icon
                  size='large'
                  name="play circle outline"
                  className="audio-icon"
                  onClick={() => this.onPlayAudio(answer.audio.id)}
                />
              }
              <audio preload='none' id={`audio-${answer.audio.id}`} onended={() => this.onStopAudio(answer.audio.id)}>
                <source src='http://172.16.6.253:1000/api/answers/audios/1/66ba5c5cee3804470cd47854836ff4ea' type="audio/ogg" />
              </audio>
            </div>
            <div className="table-action">
            {(prevData[index].text.transcription !== data[index].text.transcription ||
               prevData[index].audio.transcription !== data[index].audio.transcription) ? (
              <div
                className="table-button save-button"
                onClick={()=> this.onUpdateAnswer(answer.id, index)}
              >
                Сохранить
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
                  prevData[index].transcription !== data[index].transcription) ? 'Отменить' : 'Изменить'}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default AnswerTable;
