import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import cx from 'classnames';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Protected from '../common/protected/container'
import { Icon, Popup, Modal } from 'semantic-ui-react'
import TextArea from 'react-textarea-autosize';
import 'react-notifications/lib/notifications.css';
import Spinner from '../Spinner';
import NewIntentModal from '../NewIntentModal/NewIntentModal';
import './Answer.css';

import {
  getCommonResponses,
  getReferenceResponses,
  changeResponse,
  deleteResponse
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

  deleteAnswer = (event, answer) => {
    event.preventDefault();
    this.props.onDeleteAnswer(answer);
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
          NotificationManager.error('Something went wrong, try again.', 'Sorry :(');
        });
        break;
      case 'reference':
        this.props.getReferenceResponses()
        .catch(err => {
          NotificationManager.error('Something went wrong, try again.', 'Sorry :(');
        });
        break;
      default:
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { editDataId } = this.state;
    const { isLoading } = this.props;
    if (prevProps.isLoading !== isLoading && isLoading === false) {
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

  onCommonUpdateAnswer = (id, index) => {
    const { prevData, data } = this.state;
    const { title, changeResponse } = this.props;
    const newData = {}
    if (prevData[index].textTranscription !== data[index].textTranscription) {
      newData.textTranscription = this.state.data[index].textTranscription;
    }
    if (prevData[index].audioTranscription !== data[index].audioTranscription) {
      newData.audioTranscription = this.state.data[index].audioTranscription;
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

  onReferencesUpdateAnswer = (data, id, index) => {
    const { prevData } = this.state;
    const { title, changeResponse } = this.props;
    const newData = this.state.data;
    newData[index] = JSON.parse(JSON.stringify(data));
    newData[index].id = id;
    if (prevData[index].textTranscription === data.textTranscription) {
      delete data.textTranscription;
    }
    if (prevData[index].audioTranscription === data.audioTranscription) {
      delete data.audioTranscription;
    }
    changeResponse(data, id, title)
    .then(() => {
      const prevData = JSON.parse(JSON.stringify(this.state.data));
      const audio = document.getElementById(`audio-${id}`)
      audio.load();
      this.setState({ prevData, data: newData })
      NotificationManager.success('Answer has been updated!');
    })
    .catch(err => {
      console.log(err);
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
    newData[index] = {...newData[index], [title]: event.target.value}
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
    const isTextChenge = prevData[index].textTranscription !== data[index].textTranscription;
    const isAudioChange = prevData[index].audioTranscription !== data[index].audioTranscription;
    return isTextChenge || isAudioChange;
  }

  getAudioSrc = id => {
    const { title } = this.props;
    return urls.responses.audioUrl(title, id);
  }

  renderButton = (answer, index) => {
    if (this.props.title === 'common') {
      return this.isAnswerChange(index) ? (
        <div
          className="table-button save-button"
          onClick={()=> this.onCommonUpdateAnswer(answer.id, index)}
        >
          Сохранить
        </div>
      ) : (
        <div className="no-button" />
      )
    }
    return (
      <Modal
        closeIcon
        trigger={<div className='table-button'>Удалить</div>}
        closeOnEscape={true}
        size={'mini'}
        content='Это действие нельзя отменить. Вы уверены, что хотите удалить этот ответ?'
        actions={['Отменить', { key: 'done', content: 'Удалить', onClick: (event) => this.deleteAnswer(event, answer.id) }]}
      />
    )
  }

  render() {
    const { editDataId, data, prevData } = this.state;
    const { isLoading, title } = this.props;
    const permision = title === 'common' ? 'ALLOWED_ANSWERS_EDITING' : 'ALLOWED_KNOWLEDGEBASE_EDITING'
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
              {answer.responseDescription}
            </div>
              {editDataId === answer.id ? (
                <TextArea
                  id={`text-${answer.id}`}
                  value={answer.textTranscription}
                  className="table-textarea"
                  onChange={(e) => this.handleChangeAnswer(e, index, 'textTranscription')}
                />
              ) : (
                <div className="table-content">
                  {answer.textTranscription}
                </div>
              )}
              {editDataId === answer.id ? (
                <TextArea
                  value={answer.audioTranscription}
                  className="table-textarea"
                  onChange={(e) => this.handleChangeAnswer(e, index, 'audioTranscription')}
                />
              ) : (
                <div className="table-content">
                  {answer.audioTranscription}
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
            {this.renderButton(answer, index)}
            </div>
            <div className="table-action">
            {(editDataId === answer.id ||
              prevData[index].audioTranscription !== data[index].audioTranscription ||
              prevData[index].textTranscription !== data[index].textTranscription)
               ?
              <div
                className="table-button blue-button"
                onClick={() => this.editDataAnswer(answer.id, index)}
              >
                Отменить
              </div> :
              <Protected requiredRoles={permision}>
              {title === 'common' ? (
                <div
                  className="table-button"
                  onClick={() => this.editDataAnswer(answer.id, index)}
                >
                  Изменить
                </div>
              ) : (
                <NewIntentModal
                  key={answer.id}
                  buttonText='Изменить'
                  className="table-button"
                  modalTitle='Изменить справочный ответ'
                  onSave={(data) => this.onReferencesUpdateAnswer(data, answer.id, index)}
                  // data={answer}
                  responseId={answer.id}
                />
              )}
              </Protected>
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
  changeResponse: (data, id, title) => dispatch(changeResponse(data, id, title)),
  onDeleteAnswer: id => dispatch(deleteResponse(id))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AnswerTable));
