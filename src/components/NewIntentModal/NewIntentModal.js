import React from 'react';
import { Modal, Input, Label, Icon } from 'semantic-ui-react'
import TextArea from 'react-textarea-autosize';
import './NewIntentModal.css';

class NewIntentModal extends React.Component {
  state = {
    isModalOpen: false,
    data: {
      description: '',
      text: '',
      audio: '',
      keys: ['']
    }
  }

  onHandlerFormField = (e, title) => {
    const { data } = this.state;
    this.setState({ data: {...data, [title]: e.target.value } })
  }

  onTrigerModal = () => {
    const { isModalOpen } = this.state;
    this.setState({ isModalOpen: !isModalOpen });
  }

  onAddKey = () => {
    const { data } = this.state;
    const keys = this.state.data.keys;
    keys.push('');
    this.setState({ data: {...data, keys} });
  }

  onChangeKey = (e, index) => {
    const { data } = this.state;
    const keys = this.state.data.keys;
    keys[index] = e.target.value;
    this.setState({ data: {...data, keys} });
  }

  getContent = () => (
    <div className="modal-wrapper">
      <div className="modal-header">Добавить справочный ответ</div>
      <div className="modal-content">
        <div className="modal-formfield">
          <div className="modal-formfield-title">Описание</div>
          <Input
            onChange={(e) => this.onHandlerFormField(e, 'description')}
            value={this.state.data.description}
            className="modal-field"
            placeholder='Справка о...'
          />
        </div>
        <div className="modal-formfield">
          <div className="modal-formfield-title">Ключевые слова</div>
          <div className="modal-keys-formfield">
            {this.state.data.keys.map((key, index) => (
              <input
                onChange={(e) => this.onChangeKey(e, index)}
                className="key-input"
                value={key}
                placeholder="Ключесове слово"
              />
            ))}
            <Label
              onClick={this.onAddKey}
              className="add-label"
              size="Large"
            >
              <Icon name='plus' />
              Add
            </Label>
          </div>
        </div>
        <div className="modal-formfield">
          <div className="modal-formfield-title">Текстовый ответ</div>
          <TextArea
            className="modal-formfield-textarea modal-field"
            placeholder='Текстовый ответ...'
            value={this.state.data.text}
            onChange={(e) => this.onHandlerFormField(e, 'text')}
          />
        </div>
        <div className="modal-formfield">
          <div className="modal-formfield-title">Голосовой ответ</div>
          <TextArea
            className="modal-formfield-textarea modal-field"
            placeholder='Голосовой ответ...'
            value={this.state.data.audio}
            onChange={(e) => this.onHandlerFormField(e, 'audio')}
          />
        </div>
      </div>
      <div className="modal-actions">
        <div
          onClick={this.onTrigerModal}
          className="action-button grey-button"
        >
          Отменить
        </div>
        <div
          onClick={this.onTrigerModal}
          className="action-button"
        >
          Cохранить
        </div>
      </div>
    </div>
  )

  render() {
    return (
      <Modal
        trigger={
          <div
            onClick={this.onTrigerModal}
            className="action-button"
          >
            Добавить справочный ответ
          </div>
        }
        // dimmer="inverted"
        size="tiny"
        onClose={this.onTrigerModal}
        open={this.state.isModalOpen}
        content={this.getContent()}
      />
    );
  }
}

export default NewIntentModal;
