import React from 'react';
import { Modal, Input, Icon, Popup } from 'semantic-ui-react'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import TextArea from 'react-textarea-autosize';
import cx from 'classnames';
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
    unUniqueExamples: [],
  }

  componentWillMount() {
    if (this.props.data) {
      const { data } = this.props;
      this.setState({ data: {
        responseDescription: data.responseDescription || '',
        textTranscription: data.textTranscription || '',
        audioTranscription: data.audioTranscription || '',
        examples: data.examples || []
      }
    })
  }
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
    const { data, unUniqueExamples } = this.state;
    const examples = [ ...this.state.data.examples];
    examples.splice(index, 1);;
    this.setState({
      data: {...data, examples},
      unUniqueExamples: unUniqueExamples.filter(item => item !== index)
    });
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
      !audioTranscription || !examples.length || !isDisabled ||
      (this.state.unUniqueExamples.length !== 0);
  }

  checkExample = index => {
    const { unUniqueExamples, data } = this.state;
    const element = data.examples[index];
    let idx = data.examples.indexOf(element);
    const indices = [];
    while (idx !== -1) {
      indices.push(idx);
      idx = data.examples.indexOf(element, idx + 1);
    }
    if ( indices.length > 1 || element === '') {
      this.setState({ unUniqueExamples: [...unUniqueExamples, index] });
    } else {
      this.setState({ unUniqueExamples: unUniqueExamples.filter(item => item !== index) })
    }
  }

  getContent = () => {
    const isDisabled = this.isDisabled();
    const { data, unUniqueExamples } = this.state;
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
              value={data.responseDescription}
              className="modal-field"
              placeholder='Справка о...'
            />
          </div>
          <div className="modal-formfield">
            <div className="modal-formfield-title">Ключевые слова</div>
            <div className="modal-keys-formfield">
              {data.examples.map((key, index) => (
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
                    onBlur={() => this.checkExample(index)}
                    className={cx('key-input', { 'key-input-wrong': unUniqueExamples.indexOf(index) !== -1 })}
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
              value={data.textTranscription}
              onChange={(e) => this.onHandlerFormField(e, 'textTranscription')}
            />
          </div>
          <div className="modal-formfield">
            <div className="modal-formfield-title">Голосовой ответ</div>
            <TextArea
              className="modal-formfield-textarea modal-field"
              placeholder='Голосовой ответ...'
              value={data.audioTranscription}
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
        <NotificationContainer />
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
