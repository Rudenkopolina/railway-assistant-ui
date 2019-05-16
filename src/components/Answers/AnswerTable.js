import React from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { Icon } from 'semantic-ui-react'
import TextArea from 'react-textarea-autosize';
import 'react-notifications/lib/notifications.css';
import Spinner from './spinner.js';
import cx from 'classnames';
import './Answer.css';
import { axiosInstance, URL } from '../../helpers/axios'
import Cookies from 'js-cookie';


class AnswerTable extends React.Component {
  state = {
    data: [],
    prevData: [],
    isLoading: true,
    playedId: null,
    editDataId: null
  }

  componentWillMount() {
    axiosInstance.get(`/api/answers/responses/`)
    .then(res => {
      const prevData = JSON.parse(JSON.stringify(res.data.responses));
      this.setState({ data: res.data.responses, prevData, isLoading: false })
    })
    .catch(err => NotificationManager.error('Something go wrong. Reload page, please.', 'Sorry :('))
  }

  componentDidUpdate(prevProps, prevState) {
    const { editDataId } = this.state;
    if (prevState.editDataId !== editDataId && editDataId !== null) {
      document.getElementById(`text-${editDataId}`).focus();
    }
  }

  onUpdateAnswer = (id, index) => {
    const { prevData, data } = this.state;
    const newData = {}
    console.log(data, prevData);
    if (prevData[index].text.transcription !== data[index].text.transcription) {
      newData.textTranscription = this.state.data[index].text.transcription;
    }
    if (prevData[index].audio.transcription !== data[index].audio.transcription) {
      newData.audioTranscription = this.state.data[index].audio.transcription;
    }
    console.log(data);
    axiosInstance.post(`/api/answers/responses/${id}`, { ...newData })
    .then(res => {
      const prevData = JSON.parse(JSON.stringify(this.state.data));
      this.setState({ prevData, editDataId: null })
      NotificationManager.success('Answer has been updated!');
    })
    .catch(err => {
      NotificationManager.error('Something go wrong, try again.', 'Sorry :(');
    });
  }

  editDataAnswer = (id, index) => {
    const { editDataId, data, prevData } = this.state;
    if (editDataId === id) {
      const newData = data;
      newData[index] = {...prevData[index]};
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

  isAnswerChange = index => {
    const { prevData, data } = this.state;
    const isTextChenge = prevData[index].text.transcription !== data[index].text.transcription;
    const isAudioChange = prevData[index].audio.transcription !== data[index].audio.transcription;
    return isTextChenge || isAudioChange;
  }

  getAudioSrc = id => {
    const token = Cookies.get('authCode');
    return `${URL}/api/answers/audios/${id}/${token}`
  }

  render() {
    const { prevData, data, isLoading, editDataId } = this.state;
    return (
      <div className={cx('answer-table-container', { 'loading': isLoading })}>
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
              {this.state.playedId === answer.id ?
                <Icon
                  size='large'
                  name="pause"
                  className="audio-icon"
                  onClick={() => this.onStopAudio(answer.id)}
                /> :
                <Icon
                  size='large'
                  name="play circle outline"
                  className="audio-icon"
                  onClick={() => this.onPlayAudio(answer.id)}
                />
              }
              <audio preload='none' id={`audio-${answer.id}`} onEnded={() => this.onStopAudio(answer.audio.id)}>
                <source src={this.getAudioSrc(answer.audio.id)} type="audio/ogg" />
              </audio>
            </div>
            <div className="table-action">
            {this.isAnswerChange(index) ? (
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
            {(editDataId === answer.id ||
              prevData[index].transcription !== data[index].transcription) ?
              <div
                className="table-button blue-button"
                onClick={() => this.editDataAnswer(answer.id, index)}
              >
                Отменить
              </div> :
              <div
                className="table-button"
                onClick={() => this.editDataAnswer(answer.id, index)}
              >
                Изменить
              </div>
            }
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default AnswerTable;
