import React from 'react';
import { Modal, Input, Icon, Popup } from 'semantic-ui-react'
import TextArea from 'react-textarea-autosize';
import './NewIntentModal.css';

import request from '../../services/request';
import { urls } from '../../config';

class NewIntentModal extends React.Component {
  state = {
    isModalOpen: false,
    data: {
      responseDescription: '',
      textTranscription: '',
      audioTranscription: '',
      examples: []
    },
    selectedKey: null,
  }

  componentWillMount() {
    if (this.props.responseId) {
      request(urls.responses.getReferenceResponse(this.props.responseId))
      .then(res => {
          this.setState({ data: {
            responseDescription: res.value.responseDescription || '',
            textTranscription: res.value.textTranscription || '',
            audioTranscription: res.value.audioTranscription || '',
            examples: res.value.examples || []
          }
        })
      })
    }
  //   if (this.props.data) {
  //     const { data } = this.props;
  //     this.setState({ data: {
  //       responseDescription: data.responseDescription || '',
  //       textTranscription: data.textTranscription || '',
  //       audioTranscription: data.audioTranscription || '',
  //       examples: data.examples || []
  //     }
  //   })
  // }
}

  componentDidUpdate(prevProps, prevState) {
    const { data, isModalOpen } = this.state;
    if (prevState.data.examples.length < data.examples.length && isModalOpen) {
      document.getElementById(`key-${this.state.data.examples.length - 1}`).focus();
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
    const examples = [ ...this.state.data.examples];
    examples.push('');
    this.setState({ data: {...data, examples} });
  }

  onChangeKey = (e, index) => {
    const { data } = this.state;
    const examples = [ ...this.state.data.examples];
    examples[index] = e.target.value;
    this.setState({ data: {...data, examples} });
  }

  onSelectKey = index => {
    this.setState({ selectedKey: index })
  }

  onDeselectKey = () => {
    this.setState({ selectedKey: null })
  }

  removeKey = index => {
    const { data } = this.state;
    const examples = [ ...this.state.data.examples];
    examples.splice(index, 1);;
    this.setState({ data: {...data, examples} });
  }

  onSendData = () => {
    const { isModalOpen, data } = this.state;
    this.props.onSave(data);
      this.setState({
        data: {
          responseDescription: '',
          textTranscription: '',
          audioTranscription: '',
          examples: []
        },
        isModalOpen: !isModalOpen
      })
  }

  isDisabled = () => {
    const {
      responseDescription,
      textTranscription,
      audioTranscription,
      examples
    } = this.state.data;
    let isDisabled = true;
    examples.forEach(item => {
      isDisabled = isDisabled && !!item.trim()
    })
    return !responseDescription || !textTranscription ||
      !audioTranscription || !examples.length || !isDisabled;
  }

  getContent = () => {
    const isDisabled = this.isDisabled();
    return (
      <div className="modal-wrapper">
        <div className="modal-header">
          {this.props.modalTitle}
          <Icon name='close' onClick={this.onTrigerModal} />
        </div>
        <div className="modal-content">
          <div className="modal-formfield">
            <div className="modal-formfield-title">Описание</div>
            <Input
              onChange={(e) => this.onHandlerFormField(e, 'responseDescription')}
              value={this.state.data.responseDescription}
              className="modal-field"
              placeholder='Справка о...'
            />
          </div>
          <div className="modal-formfield">
            <div className="modal-formfield-title">Ключевые слова</div>
            <div className="modal-keys-formfield">
              {this.state.data.examples.map((key, index) => (
                <div
                  className="key-wrapper"
                  onMouseEnter={() => this.onSelectKey(index)}
                  onMouseLeave={this.onDeselectKey}
                  key={index}
                >
                  {this.state.selectedKey === index &&
                    <Icon
                      name='close'
                      className="close-key-icon"
                      onClick={() => this.removeKey(index)}
                    />
                  }
                  <input
                    id={`key-${index}`}
                    onChange={(e) => this.onChangeKey(e, index)}
                    className="key-input"
                    value={key}
                    placeholder="Ключесове слово"
                  />
                </div>
              ))}
              <button
                onClick={this.onAddKey}
                className="add-label"
                size="Large"
              >
                <Icon name='plus' />
                Add
              </button>
            </div>
          </div>
          <div className="modal-formfield">
            <div className="modal-formfield-title">Текстовый ответ</div>
            <TextArea
              className="modal-formfield-textarea modal-field"
              placeholder='Текстовый ответ...'
              value={this.state.data.textTranscription}
              onChange={(e) => this.onHandlerFormField(e, 'textTranscription')}
            />
          </div>
          <div className="modal-formfield">
            <div className="modal-formfield-title">Голосовой ответ</div>
            <TextArea
              className="modal-formfield-textarea modal-field"
              placeholder='Голосовой ответ...'
              value={this.state.data.audioTranscription}
              onChange={(e) => this.onHandlerFormField(e, 'audioTranscription')}
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
          {isDisabled ? (
            <Popup
              content='Все данные должны быть заполнены'
              position="right center"
              className='modal-hint'
              trigger={
                <div className="action-button-disabled">
                  Сохранить
                </div>
              }
            />
          ) : (
            <div
              onClick={this.onSendData}
              className="action-button"
            >
              Сохранить
            </div>
          )}
        </div>
      </div>
    )
  }

  render() {
    return (
      <Modal
        trigger={
          <div
            onClick={this.onTrigerModal}
            className={this.props.className}
          >
            {this.props.buttonText}
          </div>
        }
        size="tiny"
        onClose={this.onTrigerModal}
        open={this.state.isModalOpen}
        content={this.getContent()}
      />
    );
  }
}


export default NewIntentModal;
