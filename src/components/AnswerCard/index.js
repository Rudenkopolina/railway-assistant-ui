import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Icon } from 'semantic-ui-react'
import 'react-notifications/lib/notifications.css';
import NewIntentModal from '../NewIntentModal/NewIntentModal';
import './Answer.css';

import { urls } from '../../config';

class AnswerCard extends React.Component {
  state = {
    isAudioPlaed: false,
    shownKeyWodrsId: []
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

  // isAnswerChange = index => {
  //   const { prevData, data } = this.state;
  //   const isTextChenge = prevData[index].textTranscription !== data[index].textTranscription;
  //   const isAudioChange = prevData[index].audioTranscription !== data[index].audioTranscription;
  //   return isTextChenge || isAudioChange;
  // }


  // renderButton = (answer, index) => {
  //   if (this.props.title === 'common') {
  //     return this.isAnswerChange(index) ? (
  //       <div
  //         className="table-button save-button"
  //         onClick={()=> this.onCommonUpdateAnswer(answer.id, index)}
  //       >
  //         Сохранить
  //       </div>
  //     ) : (
  //       <div className="no-button" />
  //     )
  //   }
  //   return (
  //     <div
  //       className="table-button"
  //       onClick={()=> this.props.onDeleteAnswer(answer.id)}
  //     >
  //       Удалить
  //     </div>
  //   )
  // }

  handlerKeyWords = id => {
  const { shownKeyWodrsId } = this.state;
    if (shownKeyWodrsId.indexOf(id) !== -1) {
      this.setState({
        shownKeyWodrsId: this.state.shownKeyWodrsId.filter(item => item !==id)
      });
    } else {
      this.setState({ shownKeyWodrsId: [...this.state.shownKeyWodrsId, id] });
    }
  }

  getAudioSrc = id => {
    const { title } = this.props;
    return urls.responses.audioUrl(title, id);
  }

  render() {
    const { answer, index, isShowExamples } = this.props;
    const { shownKeyWodrsId, isAudioPlaed } = this.state;
    return (
        <div className="table-row-wrapper">
          <div className="table-row">
            <div className="table-number">{index + 1}</div>
            <div className="table-intent">
              {answer.responseDescription}
            </div>
              <div className="table-content">
                {answer.textTranscription}
              </div>
              <div className="table-content">
                {answer.audioTranscription}
              </div>
              <div className="table-action">
              {isAudioPlaed ?
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
            </div>
            <div className="table-action">
              <NewIntentModal
                key={answer.id}
                buttonText='Изменить'
                className="table-button"
                modalTitle='Изменить справочный ответ'
                onSave={(data) => this.onReferencesUpdateAnswer(data, answer.id, index)}
                data={answer}
              />
            </div>
          </div>
          {isShowExamples && (
            <div
              className='key-words-title'
              onClick={() => this.handlerKeyWords(answer.id)}
            >
            {(shownKeyWodrsId.indexOf(answer.id) !== -1) ? (
              <Fragment>
                <Icon name='angle up' />
                Скрыть ключевые слова
              </Fragment>
            ) : (
              <Fragment>
                <Icon name='angle down' />
                Показать ключевые слова
              </Fragment>
            )}
            </div>
          )}
          {(shownKeyWodrsId.indexOf(answer.id) !== -1) &&
            <div className="key-words">
            {answer.examples.map(item => (
              <span className="key-word">{item}</span>
            ))}
            </div>
          }
        </div>
    );
  }
}

export default withRouter(AnswerCard);
