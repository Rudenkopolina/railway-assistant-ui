import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import cx from 'classnames';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { Icon, Popup } from 'semantic-ui-react'
import TextArea from 'react-textarea-autosize';
import 'react-notifications/lib/notifications.css';
import Spinner from '../Spinner';
import './Answer.css';

import {
  getCommonResponses,
  getReferenceResponses,
  changeResponse
} from '../../redux/actions/responses';

import { urls } from '../../config';
const hint = "Для передачи слов-омографов используйте + перед ударной гласной. Например, гот+ов.Чтобы отметить паузу между словами, используйте -.";

class AnswerTable extends React.Component {
  state = {
    data: [],
    prevData: [],
    playedId: null,
    editDataId: null
  }

  componentWillMount() {
    const { title, data } = this.props;
    if (data[title].length !== 0) {
      this.setData();
    }
    switch (title) {
      case 'common':
        this.props.getCommonResponses()
        .catch(err => {
          NotificationManager.error('Something go wrong, try again.', 'Sorry :(');
        });
        break;
      case 'reference':
        this.props.getReferenceResponses()
        .catch(err => {
          NotificationManager.error('Something go wrong, try again.', 'Sorry :(');
        });
        break;
      default:
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { editDataId } = this.state;
    const { title } = this.props;
    if (prevProps.title !== title ||
    this.props.data[title].length !== prevProps.data[title].length) {
      this.setData();
    }
    if (prevState.editDataId !== editDataId && editDataId !== null) {
      document.getElementById(`text-${editDataId}`).focus();
    }
  }

  setData = () => {
  const { title } = this.props;
    const prevData = JSON.parse(JSON.stringify(this.props.data[title]));
    this.setState({
      data: this.props.data[title],
      prevData,
    })
  }

  onUpdateAnswer = (id, index) => {
    const { prevData, data } = this.state;
    const { title, changeResponse } = this.props;
    const newData = {}
    if (prevData[index].text.transcription !== data[index].text.transcription) {
      newData.textTranscription = this.state.data[index].text.transcription;
    }
    if (prevData[index].audio.transcription !== data[index].audio.transcription) {
      newData.audioTranscription = this.state.data[index].audio.transcription;
    }
    changeResponse(newData, id, title)
    .then(() => {
      const prevData = JSON.parse(JSON.stringify(this.state.data));
      this.setState({ prevData, editDataId: null })
      const audio = document.getElementById(`audio-${id}`)
      audio.load();
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
    const { title } = this.props;
    return urls.responses.audioUrl(title, id);
  }

  render() {
    const { editDataId, data, prevData } = this.state;
    const { isLoading } = this.props;
    return (
      <div className={cx('answer-table-container', { 'loading': isLoading })}>
      {isLoading && (
        <div className="table-spinner">
          <Spinner />
        </div>
      )}
      <NotificationContainer />
      <div className="table-title-row answer-title-row">
        <div className="table-title-content">
          Текстовый ответ
        </div>
        <div className="table-title-content">
          Голосовой ответ
          <Popup
            content={hint}
            position="right center"
            trigger={<Icon name='question circle outline' className="hint-icon"/>}
          />
        </div>
      </div>
        {data.map((answer, index) => (
          <div className="table-row"  key={index}>
            <div className="table-number">{index + 1}</div>
            <div className="table-intent">
              {answer.description}
            </div>
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
              <audio preload='none' id={`audio-${answer.id}`} onEnded={() => this.onStopAudio(answer.id)}>
                <source src={this.getAudioSrc(answer.id)} type="audio/ogg" />
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

const mapStateToProps = ({ responses }) => ({
  data: {
    common: responses.commonResponses,
    reference: responses.referenceResponses
  },
  isLoading: responses.pending
});

const mapDispatchToProps = dispatch => ({
	getCommonResponses: () => dispatch(getCommonResponses()),
	getReferenceResponses: () => dispatch(getReferenceResponses()),
  changeResponse: (data, id, title) => dispatch(changeResponse(data, id, title))

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AnswerTable));
