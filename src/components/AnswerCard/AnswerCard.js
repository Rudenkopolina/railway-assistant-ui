import React, { Fragment } from 'react';
import { Icon, Modal } from 'semantic-ui-react'
import IntentModal from '../IntentModal';
import './styles.css';
import { urls } from '../../config';

const titlesForModal = {
  common: 'Изменить типовую фразу',
  reference: 'Изменить справочный ответ'
}

class AnswerCard extends React.Component {
  state = {
    isKeywordsShown: false
  }

  deleteAnswer = (event, answer) => {
    event.preventDefault();
    this.props.onDeleteAnswer(answer);
  }

  toggleKeywordsView = () => {
  const { isKeywordsShown } = this.state;
  this.setState({ isKeywordsShown: !isKeywordsShown})
  }

  getAudioSrc = id => {
    const { title } = this.props;
    return urls.responses.audioUrl(title, id);
  }

  renderActions = () => {
    const {
      answer,
      index,
      onDeleteAnswer,
      onUpdateAnswer,
      isShowExamples,
      title
    } = this.props;
    return (
    <div className='table-actions'>
      <div className="table-action">
        {onDeleteAnswer &&
          <Modal
            closeIcon
            trigger={<div className='table-button'>Удалить</div>}
            closeOnEscape={true}
            size={'mini'}
            content='Это действие нельзя отменить. Вы уверены, что хотите удалить этот ответ?'
            actions={['Отменить', { key: 'done', content: 'Удалить', onClick: (event) => this.deleteAnswer(event, answer.id) }]}
          />
        }
      </div>
      <div className="table-action">
        <IntentModal
          key={answer.id}
          buttonText='Изменить'
          className="table-button"
          modalTitle={titlesForModal[title]}
          onSave={(data) => onUpdateAnswer(data, answer.id, index)}
          data={answer}
          isShowExamples={isShowExamples}
          isDescriptionChangeable={title === 'reference'}
        />
      </div>
    </div>
    )
  }

renderKeywords = () => {
  const {
    answer,
    isShowExamples,
  } = this.props;
  const { isKeywordsShown } = this.state;
  if (isShowExamples) {
    let message;
    let iconName;
    if (isKeywordsShown) {
      message = 'Скрыть ключевые слова';
      iconName = 'angle up';
    } else {
      message = 'Показать ключевые слова';
      iconName = 'angle down';
    }
    return (
      <Fragment>
        <div
          className='key-words-title'
          onClick={this.toggleKeywordsView}
        >
        <Icon name={iconName} />
        {message}
        </div>
        {isKeywordsShown &&
          <div className="key-words">
          {answer.examples.map(item => (
            <span className="key-word" key={item}>{item}</span>
          ))}
          </div>
        }
    </Fragment>
  )}
}

  render() {
    const {
      answer,
      index,
      playedId
    } = this.props;
    return (
      <div className="table-raw-wrapper">
        {answer.responseDescription}
      
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

        {this.renderActions()}
        {this.renderKeywords()}
      </div>
    );
  }
}

export default AnswerCard;
