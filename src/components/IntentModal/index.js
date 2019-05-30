import React from 'react';
import { Modal, Popup, Input } from 'semantic-ui-react'
import { NotificationContainer } from 'react-notifications';
import Keywords from './Keywords';
import TextArea from 'react-textarea-autosize';
import './styles.css';

import request from '../../services/request';
import { urls } from '../../config';

class IntentModal extends React.Component {
    state = {
        isModalOpen: false,
        data: {
            responseDescription: '',
            textTranscription: '',
            audioTranscription: '',
            examples: []
        }
    }

    componentWillMount() {
        if (this.props.data) {
            const { data } = this.props;
            this.setState({
                data: {
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
        this.setState({ data: { ...data, [title]: e.target.value } })
    }

    onTrigerModal = () => {
        const { isModalOpen } = this.state;
        this.setState({ isModalOpen: !isModalOpen });
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
            !audioTranscription || !examples.length || !isDisabled
        //   ||      (this.state.unUniqueExamples.length !== 0);
    }

    getContent = () => {
        const isDisabled = this.isDisabled();
        const { data } = this.state;
        return (
            <div className="modal-wrapper">
                <div className="modal-header">
                    {this.props.modalTitle}
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
                            <Keywords data={data.examples} />
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
                    > Отменить
                </div>
                {isDisabled ? (
                    <Popup
                        content='Все данные должны быть заполнены'
                        position="right center"
                        className='modal-hint'
                        trigger={
                            <div className="action-button-disabled">Сохранить</div>
                        }
                    />
                    ) : (
                            <div
                                onClick={this.onSendData}
                                className="action-button"
                            > Сохранить
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
                    <div onClick={this.onTrigerModal}
                        className={this.props.className}
                    > {this.props.buttonText}
                    </div>
                }
                size="tiny"
                closeOnDimmerClick={false}
                onClose={this.onTrigerModal}
                open={this.state.isModalOpen}
                content={this.getContent()}
                closeIcon
            />
        );
    }
}

export default IntentModal;
