import React from 'react';
import PropTypes from 'prop-types';
import {Button, Dropdown, Modal} from 'semantic-ui-react';
import './styles.css';
import 'moment/locale/ru'

class IntentsEditorModalHistory extends React.Component {
  state = {
    selectedId: -1
  };

  renderContent = () => {
    const options = this.props.availableIntents.map((intent, index) => ({text: intent.description, value: index, key: index}));
    return (
        <div className='modal-wrapper-intents-editor-history'>
          <div className='header-intents-editor-history'>
            <div className='header-intents-editor-title-history'>
              Редактирование сообщения
            </div>
          </div>
          <div className='body-history'>
            <div className='body-source-message-history'>
              Сообщение пользователя: {this.props.message.requestText}
            </div>
            <div className='body-source-message-history'>
              Системой определено намерение: {this.props.message.detectedIntentDescription ? this.props.message.detectedIntentDescription : this.props.message.detectedIntent}
            </div>
            {this.props.message.correctedIntent ?
              <div className='body-source-message-history'>
              Пользователь ранее исправил намерение на: {this.props.message.correctedIntentDescription ? this.props.message.correctedIntentDescription : this.props.message.correctedIntent}
              </div> : <div/>
            }
            <div className='body-source-message-history'>
              Изменение намерения:
            </div>
            <div className='body-source-message-history'>
              <Dropdown fluid search selection options={options} value={this.state.selectedId} onChange={this.onIntentChange} />
            </div>
            <div className='intents-editor-modal-actions-history'>
              <Button primary basic onClick={this.onModalClose}>Отменить</Button>
              <Button primary basic onClick={this.onChangeIntent}>Сохранить</Button>
            </div>
          </div>
        </div>
    );
  };

  onModalClose = () => {
    this.setState({selectedId: -1});
    this.props.onModalClose();
  };

  onChangeIntent = () => {
    this.props.onChangeIntent(this.props.message, this.props.availableIntents[this.state.selectedId]);
    this.setState({selectedId: -1});
  };

  onIntentChange = (event, value) => {
    this.setState({selectedId: value.value})
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

IntentsEditorModalHistory.propTypes = {
  visible: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired,
  availableIntents: PropTypes.array.isRequired,
  message: PropTypes.object.isRequired,
  onChangeIntent: PropTypes.func.isRequired
};

export default IntentsEditorModalHistory;
