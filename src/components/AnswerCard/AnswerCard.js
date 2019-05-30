import React, { Fragment } from 'react';
import { Icon } from 'semantic-ui-react'
import 'react-notifications/lib/notifications.css';
import NewIntentModal from '../NewIntentModal/NewIntentModal';
import './styles.css';

import { urls } from '../../config';

class AnswerCard extends React.Component {
  state = {
    shownKeyWodrsId: []
  }

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
    const {
      answer,
      index,
      isShowExamples,
      onDeleteAnswer,
      playedId,
      onUpdateAnswer
    } = this.props;
    const { shownKeyWodrsId } = this.state;
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
              {playedId === answer.id ?
                <Icon
                  size='large'
                  name="pause"
                  className="audio-icon"
                  onClick={() => this.props.onStopAudio(answer.id)}
                /> :
                <Icon
                  size='large'
                  name="play circle outline"
                  className="audio-icon"
                  onClick={() => this.props.onPlayAudio(answer.id)}
                />
              }
              <audio preload='none' id={`audio-${answer.id}`} onEnded={() => this.props.onStopAudio(answer.id)}>
                <source src={this.getAudioSrc(answer.id)} type="audio/ogg" />
              </audio>
            </div>
            <div className="table-action">
              {onDeleteAnswer &&
              <div
                className="table-button"
                onClick={()=> onDeleteAnswer(answer.id)}
              >
                Удалить
              </div>}
            </div>
            <div className="table-action">
              <NewIntentModal
                key={answer.id}
                buttonText='Изменить'
                className="table-button"
                modalTitle='Изменить справочный ответ'
                onSave={(data) => onUpdateAnswer(data, answer.id, index)}
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
              <span className="key-word" key={item}>{item}</span>
            ))}
            </div>
          }
        </div>
    );
  }
}

export default AnswerCard;
