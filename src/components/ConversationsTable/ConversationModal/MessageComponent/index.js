import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Popup } from 'semantic-ui-react';
import moment from 'moment';
import 'moment/locale/ru';
import IntentsEditorModal from '../../IntentsEditorModal';

class MessageComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isEditModalOpen: false
    };
  }

  drawIntents = (
    intents,
    detectedIntent,
    correctedIntent,
    detectedIntentDescription,
    correctedIntentDescription
  ) => {
    return (
      <Popup
        content={
          intents[0] && intents[0].confidence >= 0.3 ? (
            <div>
              Системой было определено намерение '{intents[0].intent}' с
              вероятностью
              {parseFloat(
                Math.round(intents[0].confidence * 100) / 100
              ).toFixed(2)}
            </div>
          ) : (
            <div>Информация о намерениях не доступна</div>
          )
        }
        position='right center'
        trigger={
          <div>
            #
            {correctedIntent
              ? correctedIntentDescription
                ? correctedIntentDescription
                : correctedIntent
              : detectedIntentDescription
              ? detectedIntentDescription
              : detectedIntent}
          </div>
        }
      />
    );
  };

  drawEditButton = intents => {
    if (intents[0] && intents[0].confidence < 1.0) {
      return <Icon name='edit' size='small' />;
    }
  };

  drawEntities = entities => {
    return entities.map((entity, index) => (
      <Popup
        key={index}
        content={<div>{entity.entity}</div>}
        position='right center'
        trigger={<div className='intent'>@{entity.value}</div>}
      />
    ));
  };

  onEditClick = event => {
    event.preventDefault();
    this.setState(state => ({ isEditModalOpen: !state.isEditModalOpen }));
  };

  render() {
    const { message, availableIntents, correctIntents } = this.props;
    const { isEditModalOpen } = this.state;
    return (
      <>
        <div className='line'>
          <div className='message-conversation message-conversation-user'>
            {message.requestText}
          </div>
          <div className='message-conversation-info'>
            <div className='intent'>
              {this.drawIntents(
                message.intents,
                message.detectedIntent,
                message.correctedIntent,
                message.detectedIntentDescription,
                message.correctedIntentDescription
              )}
            </div>
            <div
              className='edit-button'
              onClick={e => {
                this.onEditClick(e);
              }}
            >
              {this.drawEditButton(message.intents)}
            </div>
            {this.drawEntities(message.entities)}
          </div>
          <div className='message-conversation-time'>
            Пользователь, {moment(message.timestamp).format('HH:mm:ss')}
            <Icon
              className='message-conversation-icon'
              name='envelope outline'
            />
          </div>
        </div>
        <div className='line'>
          <div className='message-conversation message-conversation-system'>
            {message.responseText}
          </div>
          <div className='message-conversation-time time-system'>
            Система, {moment(message.timestamp).format('HH:mm:ss')}
          </div>
        </div>
        {isEditModalOpen && (
          <IntentsEditorModal
            isModalOpen={isEditModalOpen}
            onTrigerModal={this.onEditClick}
            availableIntents={availableIntents.intents}
            message={message}
            correctIntents={correctIntents}
          />
        )}
      </>
    );
  }
}

MessageComponent.propTypes = {
  message: PropTypes.object.isRequired,
  correctIntents: PropTypes.func.isRequired,
  availableIntents: PropTypes.object.isRequired
};

export default MessageComponent;
