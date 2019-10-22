import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Modal, Button } from 'semantic-ui-react';
import AudioPlayer from '../AudioPlayer';
import Truncate from 'react-truncate';
import IntentModal from '../IntentModal';
import './styles.css';
import { LABELS } from '../../../../constants/labels_en';
import { urls } from '../../../../config';

class AnswerCard extends React.Component {
  state = {
    isKeywordsShown: false,
    chosen: false,
    isModalOpen: false
  };

  onTrigerModal = () => {
    this.setState(state => ({ isModalOpen: !state.isModalOpen }));
  };

  deleteAnswer = (event, answer) => {
    event.preventDefault();
    this.props.onDeleteAnswer(answer);
  };

  toggleKeywordsView = () => {
    this.setState(state => ({ isKeywordsShown: !state.isKeywordsShown }));
  };

  getAudioSrc = id => {
    const { title } = this.props;
    return urls.responses.audioUrl(title, id);
  };

  checkAnswer = async event => {
    if (event.target.dataset.space && this.props.title === 'reference') {
      await this.setState(state => ({ chosen: !state.chosen }));
      this.props.onResponseSelected(
        this._reactInternalFiber.key,
        this.state.chosen
      );
    }
  };

  renderDelete = () => {
    const { answer, title, onDeleteAnswer } = this.props;
    if (title === 'common') return <div />;

    return (
      <div className='answer-action'>
        {onDeleteAnswer && (
          <Modal
            closeIcon
            trigger={<Icon size='small' name='trash' className='remove-icon' />}
            closeOnEscape={true}
            size={'mini'}
            content={LABELS.REMOVAL_CONFIRMATION}
            actions={[
              LABELS.CANCEL,
              {
                key: 'done',
                className: 'negative',
                content: LABELS.DELETE,
                onClick: event => this.deleteAnswer(event, answer.id)
              }
            ]}
          />
        )}
      </div>
    );
  };

  render() {
    const {
      answer,
      index,
      onUpdateAnswer,
      isShowExamples,
      title,
      supportedTTS
    } = this.props;
    const { isModalOpen, chosen } = this.state;
    return (
      <div
        className={
          answer.updating
            ? 'answer-row-wrapper-updating'
            : chosen
            ? 'answer-row-wrapper selected'
            : 'answer-row-wrapper'
        }
        onClick={e => this.checkAnswer(e)}
        data-space='answer-card'
      >
        <div data-space='answer-card' className='answer-card-content'>
          <div data-space='answer-card' className='answer-card-title'>
            <div data-space='answer-card' className='answer-overflow'>
              {answer.responseName}
            </div>
            {this.renderDelete()}
          </div>
          <div data-space='answer-card' className='answer-card-description'>
            <Truncate lines={3} ellipsis={<span>...</span>}>
              {answer.responseDescription}
            </Truncate>
          </div>
        </div>
        <div data-space='answer-card' className='answer-actions'>
          <div className='icon-position'>
            <AudioPlayer id={answer.id} url={this.getAudioSrc(answer.id)} />
          </div>
          <Button primary size='tiny' basic onClick={this.onTrigerModal}>
            {LABELS.DETAILS_BUTTON_LABEL}
          </Button>
          {isModalOpen && (
            <IntentModal
              key={answer.id}
              onTrigerModal={this.onTrigerModal}
              isModalOpen={isModalOpen}
              modalTitle={LABELS.TITLES_FOR_MODAL[title]}
              onSave={data => onUpdateAnswer(data, answer.id, index)}
              answer={answer}
              isShowExamples={isShowExamples}
              isDescriptionChangeable={title === 'reference'}
              supportedTTS={supportedTTS}
            />
          )}
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
  onUpdateAnswer: PropTypes.func.isRequired,
  onResponseSelected: PropTypes.func.isRequired,
  supportedTTS: PropTypes.bool.isRequired
};

export default AnswerCard;
