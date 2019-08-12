import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'semantic-ui-react';
import AudioPlayer from '../../AnswersSections/Answers/AudioPlayer';
import MessageComponent from './MessageComponent';
import { urls } from '../../../config';
import moment from 'moment';
import 'moment/locale/ru';
import './styles.css';

class ConversationModal extends React.PureComponent {
  componentDidMount() {
    const { getConversationsMessages, conversation } = this.props;
    getConversationsMessages(conversation.session);
  }

  drawSource = type => {
    switch (type) {
      case 'TELEGRAM':
        return <div>Отправлено из Telegram</div>;
      case 'VIBER':
        return <div>Отправлено из Viber</div>;
      case 'MIXED':
        return <div>Смешанные способы отправки</div>;
      case 'PSTN':
        return <div>Отправлено из телефонной сети</div>;
      case 'UNKN':
        return <div>Источник неизвестен</div>;
      default:
        return <div>Источник неизвестен</div>;
    }
  };

  drawMessageWithEntities = (message, entities) => {
    let offset = 0;

    entities.forEach(entity => {
      let popup = `<span class='entity' title=${
        entity.entity
      }>${message.substring(
        entity.location[0] + offset,
        entity.location[1] + offset
      )}</span>`;
      message =
        message.substring(0, offset + entity.location[0]) +
        popup +
        message.substring(entity.location[1] + offset);
      offset += popup.length - entity.location[1];
    });

    return <div dangerouslySetInnerHTML={{ __html: message }} />;
  };

  drawAudioPlayer = (id, recordingId) => {
    if (recordingId)
      return (
        <AudioPlayer
          id={id}
          url={urls.responses.getRecordingAudio(recordingId)}
        />
      );
  };

  renderContent = () => {
    const {
      conversation,
      messages,
      availableIntents,
      correctIntents
    } = this.props;
    return (
      <div className='modal-wrapper-conversation'>
        <div className='header'>
          <div className='session-dates'>
            {moment(conversation.timestamp_start).format('DD.MM.YYYY')}{' '}
          </div>
          <div className='flex'>
            <div className='left-content'>
              <div className='session-info'>
                Начало:
                {moment(conversation.timestamp_start).format('HH:mm:ss')}
              </div>
              <div className='session-info'>
                Продолжительность:
                {moment
                  .duration(
                    moment(conversation.timestamp_end) -
                      moment(conversation.timestamp_start)
                  )
                  .locale('ru')
                  .asSeconds()}
                секунды
              </div>
            </div>
            <div className='flex'>
              <div className='session-info'>
                {this.drawAudioPlayer(1, conversation.recordingId)}
              </div>
              <div className='session-info'>
                {this.drawSource(conversation.source)}
              </div>
            </div>
          </div>
        </div>
        <div className='body-conversation'>
          {messages.selectedConversationMessages.map(message => (
            <MessageComponent
              key={message.id}
              message={message}
              availableIntents={availableIntents}
              correctIntents={correctIntents}
            />
          ))}
        </div>
      </div>
    );
  };

  render() {
    const { visible, onModalClose } = this.props;
    return (
      <Modal
        size='small'
        closeOnDimmerClick={true}
        open={visible}
        content={this.renderContent()}
        onClose={onModalClose}
        closeOnEscape={true}
        closeIcon
      />
    );
  }
}

ConversationModal.propTypes = {
  conversation: PropTypes.object.isRequired,
  getConversationsMessages: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired,
  messages: PropTypes.object.isRequired,
  correctIntents: PropTypes.func.isRequired,
  availableIntents: PropTypes.object.isRequired
};

export default ConversationModal;
