import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Input, Dropdown, Button } from 'semantic-ui-react';
import './styles.css';

class UserModal extends React.Component {
  state = {
    isModalOpen: false,
    data: {
      username: '',
      password: '',
      privilegeId: 1,
      surname: '',
      patronymic: '',
      name: ''
    },
    isShowUserMessage: false
  };

  onHandlerFormField = (e, title) => {
    const { data } = this.state;
    this.setState({ data: { ...data, [title]: e.target.value } });
  };

  changeIntent = (event, value) => {
    const { data } = this.state;
    this.setState({ data: {...data, privilegeId: value.value }});
  };

  onTrigerModal = () => {
    const { isModalOpen } = this.state;
    this.setState({ isModalOpen: !isModalOpen });
  };

  onSendData = () => {
    const { data } = this.state;
    this.props.onSave(data);
    this.setState({
      isModalOpen: false,
      data: {
        username: '',
        password: '',
        privilegeId: 1,
        surname: '',
        patronymic: '',
        name: ''
      },
      isShowUserMessage: false
    });
  };

    generatePassword = () => {
        const length = 12;
        const charset =
            'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let password = '';
        for (let i = 0, n = charset.length; i < length; ++i) {
            password += charset.charAt(Math.floor(Math.random() * n));
        }
        this.setState({ data: { ...this.state.data, password } });
    };

    isDisabled = () => {
        const { username, password, surname, patronymic, name } = this.state.data;
        return !name || !username || !password || surname || patronymic;
    };

    generateLetter = () => {
        this.setState({ isShowUserMessage: true });
    };

  renderContent = () => {
    // const isDisabled = this.isDisabled();
    const options = this.props.roles.map(role => ({text: role.type, value: role.id}))
    const { data, isShowUserMessage } = this.state;
    const messageToUser = <span>
        <div>Уважаемый {data.surname} {data.name} {data.patronymic}, вы были зарегистрированы в системе.</div>
        <div>Ваш логин для входа: {data.username}</div>
        <div>Ваш пароль для входа: {data.password}</div>
    </span>
    return (
        <div className='modal-wrapper'>
            <div className='new-user-modal-header'>{this.props.buttonText}</div>
            <div className='personal-data'>
                <div className='input-section'>
                    <div className='input-title'>Фамилия:</div>
                    <Input placeholder='Фамилия...' value={data.surname} onChange={e => this.onHandlerFormField(e, 'surname')} />
                </div>
                <div className='input-section'>
                    <div className='input-title'>Имя:</div>
                    <Input placeholder='Имя...' value={data.name} onChange={e => this.onHandlerFormField(e, 'name')} />
                </div>
                <div className='input-section'>
                    <div className='input-title'>Отчество:</div>
                    <Input placeholder='Отчество...' value={data.patronymic} onChange={e => this.onHandlerFormField(e, 'patronymic')} />
                </div>
                <div className='input-section'>
                    <div className='input-title'>Логин или почта</div>
                    <Input placeholder='example@gmail.com' value={data.username} onChange={e => this.onHandlerFormField(e, 'username')} />
                </div>
                <div className='input-section'>
                    <div className='input-title'>Пароль</div>
                    <Input placeholder='examplePassword123' value={data.password} onChange={e => this.onHandlerFormField(e, 'password')} />
                </div>
                <div className='input-section'>
                <div className='input-title'>Сгенерировать пароль:</div>
                <Button icon='shield' primary basic size='medium' onClick={this.generatePassword} />
                </div>
            </div>
            <div className='new-user-section'>
                <div className='input-title'>Роль</div>
                <Dropdown fluid search selection options={options} value={data.privilegeId} onChange={this.changeIntent} />
            </div>
            <div className='new-user-section'>
                <Button icon='envelope' primary basic size='medium' onClick={this.generateLetter} />
                <span className='input-title'>Сгенерировать письмо для сотрудника</span>
            </div>
            {isShowUserMessage && (<div className='new-user-section message-to-user'>{messageToUser}</div>)}
            <div className='new-user-modal-actions'>
                <Button primary basic onClick={this.onTrigerModal}>Отменить</Button>
                <Button primary basic onClick={this.onSendData}>Сохранить</Button>
            </div>
        </div>
    );
  };

  render() {
    return (
      <Modal
        trigger={
          <Button primary size='tiny' basic onClick={this.onTrigerModal}>
            {this.props.buttonText}
          </Button>
        }
        size='small'
        closeOnDimmerClick={false}
        onClose={this.onTrigerModal}
        open={this.state.isModalOpen}
        content={this.renderContent()}
        closeIcon
      />
    );
  }
}

UserModal.propTypes = {
  roles: PropTypes.array.isRequired,
  buttonText: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired
};

export default UserModal;
