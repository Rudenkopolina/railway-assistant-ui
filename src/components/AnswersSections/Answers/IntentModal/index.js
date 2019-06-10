import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextArea from 'react-textarea-autosize';
import { NotificationContainer } from 'react-notifications';
import { Modal, Popup, Input, Icon, Button, Dropdown } from 'semantic-ui-react';
import AudioPlayer from '../AudioPlayer';
import Keywords from './Keywords';

import { urls } from '../../../../config';
import './styles.css';

const hint =
  'Для передачи слов-омографов используйте + перед ударной гласной. Например, гот+ов.Чтобы отметить паузу между словами, используйте -.';
const keywordsSent = `Ключевые слова - слова, которые фигурируют в вопросе так, как это спросил бы пользователь.`;
const keywordsList = [
  'Ключевое слово должно быть уникальным.',
  'Вы можете добавлять несколько ключевых слов с разными формулировками и формами, а также синонимы слов.',
  'Ключевое слово может содержать буквы, цифры, подчеркиванияи дефисы.',
  'Не включайте пробелы в ключевые слова.',
  'Ключевое слово не может быть длиннее 64 символов.'
];

class IntentModal extends React.Component {
  state = {
    isModalOpen: false,
    modalAnswer: {
      responseName: '',
      responseDescription: '',
      textTranscription: '',
      audioTranscription: '',
      examples: [],
      categoryId: null
    },
    playedId: null
  };

  handleUpdateKeys = keys => {
    this.setState({
      modalAnswer: { ...this.state.modalAnswer, examples: keys }
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { isModalOpen } = this.state;
    let modalAnswer = {};
    if (this.props.answer) {
      modalAnswer = {
        responseName: this.props.answer.responseName || '',
        responseDescription: this.props.answer.responseDescription || '',
        textTranscription: this.props.answer.textTranscription || '',
        audioTranscription: this.props.answer.audioTranscription || '',
        examples: this.props.answer.examples || [],
        categoryId: this.props.answer.categoryId
      };
    } else {
      modalAnswer = {
        responseName: '',
        responseDescription: '',
        textTranscription: '',
        audioTranscription: '',
        examples: [],
        categoryId: this.props.categoryId
      };
    }
    if (isModalOpen !== prevState.isModalOpen) {
      this.setState({ modalAnswer, isDisabled: false });
    }
  }

  onHandlerFormField = (value, title) => {
    const { modalAnswer } = this.state;
    this.setState({ modalAnswer: { ...modalAnswer, [title]: value } });
  };

  onTrigerModal = () => {
    const { isModalOpen } = this.state;
    this.setState({ isModalOpen: !isModalOpen });
  };

  onSendData = () => {
    const { modalAnswer } = this.state;
    this.props.onSave(modalAnswer);
    this.setState({ isModalOpen: false });
  };

  getAudioSrc = () => {
    const { audioTranscription } = this.state.modalAnswer;
    return urls.responses.newAudioUrl(audioTranscription);
  };

  isDisabled = () => {
    const { isShowExamples = true } = this.props;
    const {
      responseName,
      responseDescription,
      textTranscription,
      audioTranscription,
      examples
    } = this.state.modalAnswer;

    let isNothigChanged = true;
    let isDisabled = true;

    if (this.props.answer) {
      isNothigChanged =
        !(responseName === this.props.answer.responseName) ||
        !(responseDescription === this.props.answer.responseDescription) ||
        !(textTranscription === this.props.answer.textTranscription) ||
        !(audioTranscription === this.props.answer.audioTranscription) ||
        !(examples.length === this.props.answer.examples.length);
    }
    examples.forEach(item => {
      isDisabled = isDisabled && !!item.trim();
    });
    if (isShowExamples) {
      return (
        !isNothigChanged ||
        !responseName ||
        !responseDescription ||
        !textTranscription ||
        !audioTranscription ||
        !examples.length ||
        !isDisabled
      );
    } else {
      return (
        !isNothigChanged ||
        !responseName ||
        !responseDescription ||
        !textTranscription ||
        !audioTranscription
      );
    }
  };

  getOptions = () => {
    return this.props.categories.map(item => ({
      value: item.id,
      text: item.category
    }));
  };

  renderContent = () => {
    console.log(`render content for ${this.props.answer}`);
    const isDisabled = this.isDisabled();
    const { modalAnswer } = this.state;
    const {
      isShowExamples = true,
      isDescriptionChangeable = true,
      answer
    } = this.props;
    const keywordsHint = (
      <div>
        <p>{keywordsSent}</p>
        <ul>
          {keywordsList.map((key, i) => (
            <li key={i}>{key}</li>
          ))}
        </ul>
      </div>
    );

    return (
      <div className='modal-wrapper'>
        <div className='modal-header'>{this.props.modalTitle}</div>
        <div className='modal-content'>
          {isDescriptionChangeable ? (
            <div className='modal-formfield'>
              <div className='modal-formfield-title'>Название</div>
              <Input
                onChange={e =>
                  this.onHandlerFormField(e.target.value, 'responseName')
                }
                value={modalAnswer.responseName}
                className='modal-field'
                placeholder='Справка о...'
                disabled={!isDescriptionChangeable}
              />
            </div>
          ) : (
            <div className='modal-description-name'>
              {modalAnswer.responseName}
            </div>
          )}
          {isDescriptionChangeable ? (
            <div className='modal-formfield'>
              <div className='modal-formfield-title'>Описание</div>
              <TextArea
                className='modal-formfield-textarea modal-field'
                placeholder='Данный ответ будет ...'
                onChange={e =>
                  this.onHandlerFormField(e.target.value, 'responseDescription')
                }
                value={modalAnswer.responseDescription}
              />
            </div>
          ) : (
            <div className='modal-description'>
              {modalAnswer.responseDescription}
            </div>
          )}
          {isDescriptionChangeable && (
            <div className='modal-formfield'>
              <div className='modal-formfield-title'>Категория</div>
              <Dropdown
                onChange={(e, modalAnswer) => {
                  this.onHandlerFormField(modalAnswer.value, 'categoryId');
                }}
                value={modalAnswer.categoryId}
                fluid
                selection
                className='modal-field'
                options={this.getOptions()}
              />
            </div>
          )}
          {isShowExamples && (
            <div className='modal-formfield'>
              <div className='modal-formfield-title key-title'>
                Ключевые слова
                <Popup
                  content={keywordsHint}
                  position='right center'
                  wide='very'
                  trigger={
                    <Icon
                      name='question circle outline'
                      className='hint-icon'
                    />
                  }
                />
              </div>
              <div className='modal-keys-formfield'>
                <Keywords
                  keys={modalAnswer.examples}
                  answerId={answer ? answer.id : null}
                  handleUpdateKeys={this.handleUpdateKeys}
                />
              </div>
            </div>
          )}
          <div className='modal-formfield'>
            <div className='modal-formfield-title'>Текстовый ответ</div>
            <TextArea
              className='modal-formfield-textarea modal-field'
              placeholder='Текстовый ответ...'
              value={modalAnswer.textTranscription}
              onChange={e =>
                this.onHandlerFormField(e.target.value, 'textTranscription')
              }
            />
          </div>
          <div className='modal-formfield'>
            <div className='modal-formfield-title'>
              Голосовой ответ
              <Popup
                content={hint}
                position='right center'
                wide='very'
                trigger={
                  <Icon name='question circle outline' className='hint-icon' />
                }
              />
              <AudioPlayer
                disabled={!this.state.modalAnswer.audioTranscription}
                id={1} // ??
                url={this.getAudioSrc()}
              />
            </div>
            <TextArea
              className='modal-formfield-textarea modal-field'
              placeholder='Голосовой ответ...'
              value={modalAnswer.audioTranscription}
              onChange={e =>
                this.onHandlerFormField(e.target.value, 'audioTranscription')
              }
            />
          </div>
        </div>
        <div className='modal-actions actions'>
          <Button onClick={this.onTrigerModal}>Отменить</Button>
          <Button onClick={this.onSendData} primary disabled={isDisabled}>
            Сохранить
          </Button>
        </div>
        <NotificationContainer />
      </div>
    );
  };

  render() {
    return (
      <Modal
        trigger={
          <Button primary basic onClick={this.onTrigerModal}>
            {this.props.buttonText}
          </Button>
        }
        size='large'
        closeOnDimmerClick={false}
        onClose={this.onTrigerModal}
        open={this.state.isModalOpen}
        content={this.renderContent()}
        closeIcon
      />
    );
  }
}

const mapStateToProps = ({ categories }) => ({
  categories: categories.categories
});

IntentModal.propTypes = {
  buttonText: PropTypes.string.isRequired,
  modalTitle: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  answer: PropTypes.object,
  isShowExamples: PropTypes.bool,
  isDescriptionChangeable: PropTypes.bool,
  categoryId: PropTypes.number
};

export default connect(
  mapStateToProps,
  null
)(IntentModal);
