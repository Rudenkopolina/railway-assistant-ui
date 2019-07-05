import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'semantic-ui-react';
import './styles.css';
import moment from "moment";
import 'moment/locale/ru'

class ConversationModal extends React.Component {

  renderContent = () => {
    return (
        <div className='modal-wrapper-conversation'>
          <div className='header'>
            {/* <div className='session-title'>{this.props.conversation.session}</div> */}
            <div className='session-dates'>{(moment(this.props.conversation.timestamp_start)).format('DD.MM.YYYY')} </div>

            <div className='session-info'>Начало: {(moment(this.props.conversation.timestamp_start)).format('HH:mm:ss')}</div>
            <div className='session-info'>Продолжительность: {moment.duration(moment(this.props.conversation.timestamp_end) - moment(this.props.conversation.timestamp_start)).locale('ru').asSeconds()} секунды</div>

          </div>
          <div className='body'>
            {this.props.messages.map((message, index) => {
              return (
                <div key={index}>
                  <div className='line'>
                    <div className='message-conversation message-conversation-user'>{message.requestText}</div>
                    <div className='message-conversation-time time-user'>Пользователь, {moment(message.timestamp).format('HH:mm:ss')}</div>
                  </div>
                  <div className='line'>
                    <div className='message-conversation message-conversation-system'>{message.responseText}</div>
                    <div className='message-conversation-time time-system'>Система, {moment(message.timestamp).format('HH:mm:ss')}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
    );
  };

  render() {
    return (
      <Modal
        size='small'
        closeOnDimmerClick={true}
        open={this.props.visible}
        content={this.renderContent()}
        onClose={this.props.onModalClose}
        closeOnEscape={true}
        closeIcon
      />
    );
  }
}

ConversationModal.propTypes = {
  conversation: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired,
  messages: PropTypes.array.isRequired
};

export default ConversationModal;
