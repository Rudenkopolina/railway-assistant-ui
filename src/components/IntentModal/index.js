import React from 'react';
import { connect } from 'react-redux';
import { Modal, Popup, Input, Icon, Button, Dropdown } from 'semantic-ui-react';
import { NotificationContainer } from 'react-notifications';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import Keywords from './Keywords';
import TextArea from 'react-textarea-autosize';
import { urls } from '../../config';
import './styles.css';

const hint =
  'Для передачи слов-омографов используйте + перед ударной гласной. Например, гот+ов.Чтобы отметить паузу между словами, используйте -.';

class IntentModal extends React.Component {
  state = {
    isModalOpen: false,
    data: {
      responseName: '',
      responseDescription: '',
      textTranscription: '',
      audioTranscription: '',
      examples: [],
      categoryId: null
    },
    playedId: null
  };

  handleUpdateKeys = (keys) => {
    this.setState({
      data: { ...this.state.data, examples: keys }
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { isModalOpen } = this.state;
    let data = {};
    if (this.props.data) {
      data = {
        responseName: this.props.data.responseName || '',
        responseDescription: this.props.data.responseDescription || '',
        textTranscription: this.props.data.textTranscription || '',
        audioTranscription: this.props.data.audioTranscription || '',
        examples: this.props.data.examples || [],
        categoryId: this.props.data.categoryId
      };
    } else {
      data = {
        responseName: '',
        responseDescription: '',
        textTranscription: '',
        audioTranscription: '',
        examples: [],
        categoryId: this.props.category,
      };
    }
    if (isModalOpen !== prevState.isModalOpen) {
      this.setState({ data });
    }
    // if (prevState.data.examples.length < data.examples.length && isModalOpen) {
    //     document.getElementById(`key-${this.state.data.examples.length - 1}`).focus();
    // }
  }

  onHandlerFormField = (value, title) => {
    const { data } = this.state;
    this.setState({ data: { ...data, [title]: value } });
  };

  onTrigerModal = () => {
    const { isModalOpen } = this.state;
    this.setState({ isModalOpen: !isModalOpen });
  };

  onSendData = () => {
    const { data } = this.state;
    this.props.onSave(data);
    this.setState({ isModalOpen: false });
  };

  getAudioSrc = () => {
    const { audioTranscription } = this.state.data;
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
    } = this.state.data;
    let isDisabled = true;
    examples.forEach(item => {
      isDisabled = isDisabled && !!item.trim();
    });
    if (isShowExamples) {
      return (
        !responseName ||
        !responseDescription ||
        !textTranscription ||
        !audioTranscription ||
        !examples.length ||
        !isDisabled ||
        this.state.keywordsError
      );
    } else {
      return (
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
      text: item.category,
    }))
  }

  renderContent = () => {
    const isDisabled = this.isDisabled();
    const { data } = this.state;
    const {
      isShowExamples = true,
      isDescriptionChangeable = true
    } = this.props;

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
                value={data.responseName}
                className='modal-field'
                placeholder='Справка о...'
                disabled={!isDescriptionChangeable}
              />
            </div>
          ) : (
            <div className='modal-description-name'>{data.responseName}</div>
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
                value={data.responseDescription}
              />
            </div>
          ) : (
            <div className='modal-description'>{data.responseDescription}</div>
          )}
          {isDescriptionChangeable &&
            <div className='modal-formfield'>
              <div className='modal-formfield-title'>Категория</div>
              <Dropdown
                onChange={(e, data) =>{
                  this.onHandlerFormField(data.value, 'categoryId')
                }
                }
                value={data.categoryId}
                fluid
                selection
                className='modal-field'
                options={this.getOptions()}
              />
            </div>
          }
          {isShowExamples && (
            <div className='modal-formfield'>
              <div className='modal-formfield-title'>Ключевые слова</div>
              <div className='modal-keys-formfield'>
                <Keywords
                  keys={data.examples}
                  topic={data.responseDescription}
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
              value={data.textTranscription}
              onChange={e => this.onHandlerFormField(e.target.value, 'textTranscription')}
            />
          </div>
          <div className='modal-formfield'>
            <div className='modal-formfield-title'>
              Голосовой ответ
              <Popup
                content={hint}
                position='right center'
                trigger={
                  <Icon name='question circle outline' className='hint-icon' />
                }
              />
              <AudioPlayer
                disabled={!this.state.data.audioTranscription}
                id='newAudio'
                url={this.getAudioSrc()}
              />
            </div>
            <TextArea
              className='modal-formfield-textarea modal-field'
              placeholder='Голосовой ответ...'
              value={data.audioTranscription}
              onChange={e => this.onHandlerFormField(e.target.value, 'audioTranscription')}
            />
          </div>
        </div>
        <div className='modal-actions'>
          <Button
            onClick={this.onTrigerModal}
          >

            Отменить
          </Button>
          <Button
            onClick={this.onSendData}
            primary
            disabled={isDisabled}
          >
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
          <Button primary onClick={this.onTrigerModal}>
            {this.props.buttonText}
          </Button>
        }
        size='tiny'
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
  categories: categories.categories,
});

export default connect(mapStateToProps, null)(IntentModal);
