import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Modal } from 'semantic-ui-react';
import AudioPlayer from '../AudioPlayer';
import Truncate from 'react-truncate';
import IntentModal from '../IntentModal';
import './styles.css';
import { urls } from '../../../../config';

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
    const { answer, index, onUpdateAnswer, isShowExamples, title } = this.props;
    return (
      <IntentModal
        key={answer.id}
        buttonText='Детали'
        modalTitle={titlesForModal[title]}
        onSave={data => onUpdateAnswer(data, answer.id, index)}
        answer={answer}
        isShowExamples={isShowExamples}
        isDescriptionChangeable={title === 'reference'}
      />
    );
  };

  renderDelete = () => {
    const { answer, onDeleteAnswer } = this.props;
    return (
      <div className='answer-action'>
        {onDeleteAnswer && (
          <Modal
            closeIcon
            trigger={<Icon size='small' name='trash' className='remove-icon' />}
            closeOnEscape={true}
            size={'mini'}
            content='Вы уверены, что хотите удалить этот ответ? Ответ будет потерян без возможности восстановления.'
            actions={[
              'Отменить',
              {
                key: 'done',
                className: 'negative',
                content: 'Удалить',
                onClick: event => this.deleteAnswer(event, answer.id)
              }
            ]}
          />
        )}
      </div>
    );
  };

  render() {
    const { answer } = this.props;
    return (
      <div className='answer-row-wrapper'>
        <div className='answer-card-content'>
          <div className='answer-card-title'>
            <div className='answer-overflow'>{answer.responseName}</div>
            {this.renderDelete()}
          </div>
          <div className='answer-card-description'>
            <Truncate lines={3} ellipsis={<span>...</span>}>
              {answer.responseDescription}
            </Truncate>
          </div>
        </div>
        <div className='answer-actions'>
          <div className='icon-position'>
            <AudioPlayer id={answer.id} url={this.getAudioSrc(answer.id)} />
          </div>
          {this.renderActions()}
        </div>
      </div>
    );
  }
}

AnswerCard.propTypes = {
  title: PropTypes.string.isRequired,
  answer: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isShowExamples: PropTypes.bool.isRequired,
  onDeleteAnswer: PropTypes.func.isRequired,
  onPlayAudio: PropTypes.func.isRequired,
  onStopAudio: PropTypes.func.isRequired,
  playedId: PropTypes.number,
  onUpdateAnswer: PropTypes.func.isRequired
};

export default AnswerCard;
