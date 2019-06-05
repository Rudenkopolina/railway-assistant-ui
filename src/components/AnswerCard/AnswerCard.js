import React from 'react';
import { Icon, Modal } from 'semantic-ui-react';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import IntentModal from '../IntentModal';
import './styles.css';
import { urls } from '../../config';

const titlesForModal = {
  common: 'Изменить типовую фразу',
  reference: 'Изменить справочный ответ'
};

class AnswerCard extends React.Component {
  state = {
    isKeywordsShown: false
  };

  deleteAnswer = (event, answer) => {
    event.preventDefault();
    this.props.onDeleteAnswer(answer);
  };

  toggleKeywordsView = () => {
    const { isKeywordsShown } = this.state;
    this.setState({ isKeywordsShown: !isKeywordsShown });
  };

  getAudioSrc = id => {
    const { title } = this.props;
    return urls.responses.audioUrl(title, id);
  };

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
        <div className='table-action'>
          {onDeleteAnswer && (
            <Modal
              closeIcon
              trigger={<div className='card-button'>Удалить</div>}
              closeOnEscape={true}
              size={'mini'}
              content='Это действие нельзя отменить. Вы уверены, что хотите удалить этот ответ?'
              actions={[
                'Отменить',
                {
                  key: 'done',
                  content: 'Удалить',
                  onClick: event => this.deleteAnswer(event, answer.id)
                }
              ]}
            />
          )}
        </div>
        <div className='table-action'>
          <IntentModal
            key={answer.id}
            buttonText='Изменить'
            className='card-button'
            modalTitle={titlesForModal[title]}
            onSave={data => onUpdateAnswer(data, answer.id, index)}
            data={answer}
            isShowExamples={isShowExamples}
            isDescriptionChangeable={title === 'reference'}
          />
        </div>
      </div>
    );
  };

  renderKeywords = () => {
    const { answer, isShowExamples } = this.props;
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
        <div className='key-words-container'>
          <div className='key-words-title' onClick={this.toggleKeywordsView}>
            <Icon name={iconName} />
            {message}
          </div>
          {isKeywordsShown && (
            <div className='key-words'>
              {answer.examples.map(item => (
                <span className='key-word' key={item}>
                  {item}
                </span>
              ))}
            </div>
          )}
          </div>
      );
    }
  };

  render() {
    const { answer, playedId } = this.props;
    return (
      <div className='table-raw-wrapper'>
      <div className='header'>
      <div className = 'info'>
        <div className='title'>{answer.responseDescription}</div>
        <div className='description'>{answer.responseDescription}</div>
      </div>
        <AudioPlayer
          playedId={playedId}
          id={answer.id}
          onStopAudio={this.props.onStopAudio}
          onPlayAudio={this.props.onPlayAudio}
          getAudioSrc={this.getAudioSrc}
        />
        </div>
        {this.renderKeywords()}
        {this.renderActions()}
      </div>
    );
  }
}

export default AnswerCard;
