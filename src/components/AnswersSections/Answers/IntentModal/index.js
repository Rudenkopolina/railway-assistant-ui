import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextArea from 'react-textarea-autosize';
import { NotificationContainer } from 'react-notifications';
import { Modal, Popup, Input, Icon, Button, Dropdown } from 'semantic-ui-react';
import AudioPlayer from '../AudioPlayer';
import Keywords from './Keywords';
import AudioRecorder from '../AudioRecorder';

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
    modalAnswer: {
      responseName: '',
      responseDescription: '',
      responseBuffer: '',
      textTranscription: '',
      inputType: 0,
      audioTranscription: '',
      examples: [],
      categoryId: null
    },
    playedId: null,
    disable: true,
    showRecorder: false
  };

  handleUpdateKeys = keys => {
    this.setState(state => ({
      modalAnswer: { ...state.modalAnswer, examples: keys }
    }));
  };

  componentDidMount() {
    const { answer, supportedTTS } = this.props;
    let modalAnswer = {};
    let showRecorder = false;
    if (answer) {
      modalAnswer = {
        responseName: answer.responseName || '',
        responseDescription: answer.responseDescription || '',
        textTranscription: answer.textTranscription || '',
        audioTranscription: answer.audioTranscription || '',
        examples: answer.examples || [],
        categoryId: answer.categoryId,
        inputType: answer.inputType || 0
      };
    }
    if (supportedTTS) {
      showRecorder = !supportedTTS
    }
    this.setState({ modalAnswer, showRecorder });
  }

  isDisabled = () => {
    const { isShowExamples = true, answer, supportedTTS 
    } = this.props;
    const {
      responseName,
      responseBuffer,
      responseDescription,
      textTranscription,
      audioTranscription,
      categoryId,
      examples
    } = this.state.modalAnswer;

    let isNothigChanged = true;
    let isBufferChanged = false;

    if (answer) {
      isNothigChanged =
        textTranscription !== answer.textTranscription ||
        responseName !== answer.responseName ||
        categoryId !== answer.categoryId ||
        responseDescription !== answer.responseDescription ||
        audioTranscription !== answer.audioTranscription ||
        examples.join(',') !== answer.examples.join(',');
      isBufferChanged = !!responseBuffer;
    }

    if (isShowExamples && supportedTTS) {
      return (
        !isNothigChanged ||
        !responseName ||
        !responseDescription ||
        !textTranscription ||
        !audioTranscription ||
        !examples.length
      );
    } else if (!isShowExamples && supportedTTS) {
      return !isNothigChanged || !textTranscription || !audioTranscription;
    } else if (isShowExamples && !supportedTTS) {
      return (
        (!isNothigChanged ||
          !responseDescription ||
          !textTranscription ||
          !examples.length) &&
        !isBufferChanged
      );
    } else {
      return (!isNothigChanged || !textTranscription) && !isBufferChanged;
    }
  };

  onHandlerFormField = (value, title) => {
    this.setState(state => ({
      modalAnswer: { ...state.modalAnswer, [title]: value, inputType: 0 }
    }));
  };

  onRecord = record => {
    this.setState((state, props) => ({
      modalAnswer: {
        ...state.modalAnswer,
        responseBuffer: record,
        inputType: 1
      }
    }));
  };

  showRecorder = () => {
    this.setState(state => ({showRecorder: !state.showRecorder}))
  }

  onSendData = () => {
    const { modalAnswer } = this.state;
    this.props.onSave(modalAnswer);
    this.props.onTrigerModal();
  };

  getAudioSrc = () => {
    const { audioTranscription } = this.state.modalAnswer;
    return urls.responses.newAudioUrl(audioTranscription);
  };

  getRecordSrc = () => {
    const { isShowExamples = true, answer } = this.props;
    const title = isShowExamples ? 'reference' : 'common';
    if (answer) {
      return urls.responses.audioUrl(title, answer.id);
    }
  };

  getOptions = () => {
    const { categories } = this.props;
    return categories.map(item => ({
      value: item.id,
      text: item.category
    }));
  };

  renderDescriptionCommon = () => {
    const { modalAnswer } = this.state;
    return (
      <>
        <div className='modal-description-name'>{modalAnswer.responseName}</div>
        <div className='modal-description'>
          {modalAnswer.responseDescription}
        </div>
      </>
    );
  };

  renderDescription = () => {
    const { modalAnswer } = this.state;
    return (
      <div className='modal-formfield'>
        <div className='modal-formfield-title'>Название</div>
        <Input
          onChange={e =>
            this.onHandlerFormField(e.target.value, 'responseName')
          }
          value={modalAnswer.responseName}
          className='modal-field'
          placeholder='Справка о...'
        />
        <div className='modal-formfield-title'>Описание</div>
        <TextArea
          className='modal-formfield-textarea modal-field'
          placeholder='Данный ответ будет ...'
          onChange={e =>
            this.onHandlerFormField(e.target.value, 'responseDescription')
          }
          value={modalAnswer.responseDescription}
        />
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
    );
  };

  renderKeywords = () => {
    const { modalAnswer } = this.state;
    const { answer } = this.props;
    const answerId = answer ? answer.id : null;
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
      <div className='modal-formfield'>
        <div className='modal-formfield-title key-title'>
          Ключевые слова
          <Popup
            content={keywordsHint}
            position='right center'
            wide='very'
            trigger={
              <Icon name='question circle outline' className='hint-icon' />
            }
          />
        </div>
        <div className='modal-keys-formfield'>
          <Keywords
            keys={modalAnswer.examples}
            answerId={answerId}
            handleUpdateKeys={this.handleUpdateKeys}
          />
        </div>
      </div>
    );
  };

  renderAudio = () => {
    const { modalAnswer } = this.state;
    return (
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
            id={1} // ??
            url={this.getAudioSrc()}
          />
          <Button basic color='blue' content='Записать ответ' icon='microphone' className='modal-formfield-button' onClick={this.showRecorder} />
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
    );
  };

  renderContent = () => {    
    const isDisabled = this.isDisabled();
    const { modalAnswer, showRecorder } = this.state;
    const {
      isShowExamples = true,
      isDescriptionChangeable = true,
      supportedTTS,
      modalTitle,
      onTrigerModal
    } = this.props;

    return (
      <div className='modal-wrapper'>
        <div className='modal-header'>{modalTitle}</div>
        <div className='modal-content'>
          {isDescriptionChangeable
            ? this.renderDescription()
            : this.renderDescriptionCommon()}
          {isShowExamples && this.renderKeywords()}
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
          {!showRecorder && this.renderAudio()}
          {showRecorder && (
            <div className='modal-formfield'>
              <div className='modal-formfield-title'>
              {!supportedTTS && <span className='unsupported-tts-label'>Для вашего региона нет поддержки генерации речи</span>}
              <AudioPlayer id={1} url={this.getRecordSrc()} />
              {supportedTTS && <Button basic color='blue' content='Вернуться к генерации' className='modal-formfield-button' onClick={this.showRecorder} />}
              </div>
              <AudioRecorder onSaveRecord={this.onRecord} />
            </div>)}
        </div>
        <div className='modal-actions actions'>
          <Button onClick={onTrigerModal}>Отменить</Button>
          <Button onClick={this.onSendData} primary disabled={isDisabled}>
            Сохранить
          </Button>
        </div>
        <NotificationContainer />
      </div>
    );
  };

  render() {
    const { isModalOpen, onTrigerModal } = this.props;
    return (
      <Modal
        size='large'
        closeOnDimmerClick={false}
        onClose={onTrigerModal}
        open={isModalOpen}
        content={this.renderContent}
        closeIcon
      />
    );
  }
}

const mapStateToProps = ({ categories }) => ({
  categories: categories.categories
});

IntentModal.propTypes = {
  modalTitle: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  answer: PropTypes.object,
  isShowExamples: PropTypes.bool,
  isDescriptionChangeable: PropTypes.bool,
  categoryId: PropTypes.number,
  supportedTTS: PropTypes.bool
};

export default connect(
  mapStateToProps,
  null
)(IntentModal);
