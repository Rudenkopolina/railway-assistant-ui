import React from 'react';
import PropTypes from 'prop-types';
import {Modal, Icon, Popup} from 'semantic-ui-react';
import './styles.css';
import moment from "moment";
import 'moment/locale/ru'

class ConversationModal extends React.Component {

  drawSource = (type) => {
    switch(type) {
      case "TELEGRAM": return (<div>Отправлено из Telegram</div>);
      case "VIBER": return (<div>Отправлено из Viber</div>);
      case "MIXED": return (<div>Смешанные способы отправки</div>);
      case "PSTN": return (<div>Отправлено из телефонной сети</div>);
      case "UNKN": return (<div>Источник неизвестен</div>);
      default: return (<div>Источник неизвестен</div>);
    }
  };

  drawMessageWithEntities = (message, entities) => {
    let offset = 0;

    entities.forEach(entity => {
      let popup = `<span class='entity' title=${entity.entity}>${message.substring(entity.location[0] + offset, entity.location[1] + offset)}</span>`;
      message = message.substring(0, offset + entity.location[0]) + popup + message.substring(entity.location[1] + offset);
      offset += popup.length - entity.location[1];
    });

    return (<div dangerouslySetInnerHTML= {{__html: message}}/>);
  };

  drawIntents = (intents) => {
    return (<Popup
      content={intents.map((intent, index) => {
        if (intent.confidence > 0) {
          return (<div key={index}>{intent.intent} - {parseFloat(Math.round(intent.confidence * 100) / 100).toFixed(2)}</div>);
        }
      })
      }
      position='right center'
      trigger={
        <div>#{intents[0] ? intents[0].confidence > 0.3 ? intents[0].intent : "Irrelevant" : "Irrelevant"}</div>
      }
    />);
  };

  drawEntities = (entities) => {
    return (entities.map((entity) => <Popup
      content={<div>{entity.entity}</div>}
      position='right center'
      trigger={
        <span className='entity-list'>@{entity.value}</span>
      }
    />));
  };

  renderContent = () => {
    return (
        <div className='modal-wrapper-conversation'>
          <div className='header'>
            {/* <div className='session-title'>{this.props.conversation.session}</div> */}
          <div className='session-dates'>{(moment(this.props.conversation.timestamp_start)).format('DD.MM.YYYY')} </div>
          <div className='flex'>
            <div className='left-content'>
              <div className='session-info'>Начало: {(moment(this.props.conversation.timestamp_start)).format('HH:mm:ss')}</div>
              <div className='session-info'>Продолжительность: {moment.duration(moment(this.props.conversation.timestamp_end) - moment(this.props.conversation.timestamp_start)).locale('ru').asSeconds()} секунды</div>
            </div>
            <div className='session-info'>{this.drawSource(this.props.conversation.source)}</div>
          </div>
          </div>
          <div className='body'>
            {this.props.messages.map((message, index) => {
              return (
                <div key={index}>
                  <div className='line'> 
                    <div className='message-conversation message-conversation-user'>{message.requestText}</div>
                    <div className='message-conversation-info'>
                      <div className='intent'>{this.drawIntents(message.intents)}</div>
                      <div className='entities'>{this.drawEntities(message.entities)}</div>
                    </div>
                    <div className='message-conversation-time'>Пользователь, {moment(message.timestamp).format('HH:mm:ss')}
                    <Icon className='message-conversation-icon' name='envelope outline' />
                    </div>
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
