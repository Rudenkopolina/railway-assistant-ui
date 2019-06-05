import React, { Fragment } from 'react';
import { Icon, Modal, Button } from 'semantic-ui-react';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import Truncate from 'react-truncate';
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
      onUpdateAnswer,
      isShowExamples,
      title
    } = this.props;
    return (

        <IntentModal
          key={answer.id}
          buttonText='Детали'
          className='card-button'
          modalTitle={titlesForModal[title]}
          onSave={data => onUpdateAnswer(data, answer.id, index)}
          data={answer}
          isShowExamples={isShowExamples}
          isDescriptionChangeable={title === 'reference'}
        />

    );
  };

  renderDelete = () => {
    const { answer, onDeleteAnswer } = this.props;
    return (
      <div className='table-action'>
        {onDeleteAnswer && (
          <Modal
            closeIcon
            trigger={<Icon
              size='small'
              name='remove'
              className='remove-icon'
            />}
            closeOnEscape={true}
            size={'mini'}
            content='Вы уверены, что хотите удалить этот ответ? Ответ будет потерян без возможности восстановления.'
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
    );
  }

  // renderKeywords = () => {
  //   const { answer, isShowExamples } = this.props;
  //   const { isKeywordsShown } = this.state;
  //   if (isShowExamples) {
  //     let message;
  //     let iconName;
  //     if (isKeywordsShown) {
  //       message = 'Скрыть ключевые слова';
  //       iconName = 'angle up';
  //     } else {
  //       message = 'Показать ключевые слова';
  //       iconName = 'angle down';
  //     }
  //     return (
  //       <div className='key-words-container'>
  //         <div className='key-words-title' onClick={this.toggleKeywordsView}>
  //           <Icon name={iconName} />
  //           {message}
  //         </div>
  //         {isKeywordsShown && (
  //           <div className='key-words'>
  //             {answer.examples.map(item => (
  //               <span className='key-word' key={item}>
  //                 {item}
  //               </span>
  //             ))}
  //           </div>
  //         )}
  //         </div>
  //     );
  //   }
  // };

  render() {
    const { answer, playedId } = this.props;
    return (
      <div className='table-raw-wrapper'>
        <div className='answer-card-content'>
          <div className='answer-card-title'>
            <div className='answer-overflow'>{answer.responseDescription}</div>
            {this.renderDelete()}
          </div>
          <div className='answer-card-description'>
            <Truncate lines={3} ellipsis={<span>...</span>}>
              {answer.responseDescription}
            </Truncate>
          </div>
        </div>
        <div className='table-actions'>
          <div className='icon-position'>            
            <AudioPlayer
              playedId={playedId}
              id={answer.id}
              onStopAudio={this.props.onStopAudio}
              onPlayAudio={this.props.onPlayAudio}
              getAudioSrc={this.getAudioSrc}
            />
          </div>
          {this.renderActions()}
        </div>
      </div>
    );
  }
}

export default AnswerCard;
