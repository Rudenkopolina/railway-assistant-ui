import React from 'react';
import PropTypes from 'prop-types';
import { Button, Dropdown, Icon, Modal } from 'semantic-ui-react';
import './styles.css';
import 'moment/locale/ru';

class IntentsEditorModal extends React.Component {
  state = {
    selectedId: -1
  };

  onSave = () => {
    const { availableIntents, message, onChangeIntent } = this.props;
    const { selectedId } = this.state;
    onChangeIntent(message, availableIntents[selectedId]);
    this.setState({ selectedId: -1 });  
  };

  onIntentChange = (e, value) => {
    this.setState({ selectedId: value.value });
  };

  renderConfidence = message => {
    if (message.intents) {
      return (
        <>
          {message.intents[0].confidence >= 0.3 && (
            <div>
              Системой было определено намерение '
              {message.intents[0].intent}' с вероятностью
              {parseFloat(
                Math.round(message.intents[0].confidence * 100) / 100
              ).toFixed(2)}
            </div>
          )}
        </>
      );
    } else return <div>Информация о намерениях не доступна</div>;
  };

  renderContent = () => {
    const { availableIntents, message, onTrigerModal } = this.props;
    const { selectedId } = this.state;
    const options = availableIntents.map((intent, index) => ({
      text: intent.description,
      value: index,
      key: index
    }));
    return (
      <div className='modal-wrapper-intents-editor'>
        <div className='intents-editor-container'>
          <div className='intents-editor-user-message'>
            {message.requestText}
          </div>
          <div className='intents-editor-label'>Сообщение пользователя</div>
        </div>
        <div className='intents-editor-container'>
          <div className='intents-editor-intent'>
            #{message.detectedIntentDescription}
          </div>
          <div className='intents-editor-label'>
            {this.renderConfidence(message)}
          </div>
        </div>

        <div className='intents-editor-change'>
          <div className='intents-editor-label'>Изменить намерение</div>
          <Dropdown
            className='intents-editor-dropdown'
            fluid
            search
            selection
            options={options}
            value={selectedId}
            onChange={this.onIntentChange}
          />
        </div>

        {message.correctedIntent ? (
          <div className='intents-editor-history'>
            <Icon
              className='intents-calendar-icon'
              name='calendar alternate outline'
            />
            Намерение исправлено на {message.correctedIntentDescription}
          </div>
        ) : (
          <div />
        )}

        <div className='intents-editor-modal-actions'>
          <Button
            className='intents-editor-modal-button'
            basic
            onClick={onTrigerModal}
          >
            Отменить
          </Button>
          <Button
            className='intents-editor-modal-button'
            primary
            basic
            onClick={this.onSave}
          >
            Сохранить
          </Button>
        </div>
      </div>
    );
  };

  render() {
    const { isModalOpen, onTrigerModal } = this.props;
    return (
      <Modal
        size='mini'
        dimmer='blurring'
        closeOnDimmerClick={false}
        open={isModalOpen}
        content={this.renderContent}
        onClose={onTrigerModal}
        closeIcon
      />
    );
  }
}

IntentsEditorModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  onTrigerModal: PropTypes.func.isRequired,
  availableIntents: PropTypes.array.isRequired,
  message: PropTypes.object.isRequired,
  onChangeIntent: PropTypes.func.isRequired
};

export default IntentsEditorModal;
