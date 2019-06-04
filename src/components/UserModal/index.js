import React from 'react';
import { Modal, Popup, Input, Dropdown } from 'semantic-ui-react';
import './styles.css';

const options = [
  { text: 'Главный администратор', value: 'Главный администратор' },
  { text: 'Редактор ответов', value: 'Редактор ответов' },
  { text: 'Редактор базы знаний', value: 'Редактор базы знаний' },
  { text: 'Главный редактор', value: 'Главный редактор' }
]

class UserModal extends React.Component {
  state = {
          isModalOpen: false,
          data: {
              name: '',
              username: '',
              password: '',
              privilege: options[0].text
          },
          isShowUserMessage: false
      }

    onHandlerFormField = (e, title) => {
        const { data } = this.state;
        this.setState({ data: { ...data, [title]: e.target.value } })
    }

    changeIntent = data => {
      this.setState({ data: {...this.state.data, privilege: data.value} });
    }

    onTrigerModal = () => {
        const { isModalOpen } = this.state;
        this.setState({ isModalOpen: !isModalOpen });
    }

    onSendData = () => {
        const { data } = this.state;
        this.props.onSave(data);
        this.setState({
          isModalOpen: false,
          data: {
              name: '',
              username: '',
              password: '',
              privilege: options[0].text
          },
          isShowUserMessage: false
        })
    }

    generatePassword = () => {
      const length = 12;
      const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let password = "";
      for (let i = 0, n = charset.length; i < length; ++i) {
          password += charset.charAt(Math.floor(Math.random() * n));
      }
        this.setState({ data: {...this.state.data, password } })
    }

    isDisabled = () => {
        const {
            name,
            username,
            password,
            privilege
        } = this.state.data;
        return !name || !username || !password || !privilege;
    }

    generateLatter = () => {
      this.setState({ isShowUserMessage: true })
    }

    renderContent = () => {
        const isDisabled = this.isDisabled();
        const { data, isShowUserMessage } = this.state;
        const messageToUser = `
        Уважаемый ${data.name}, вы были зарегистрированы в системе.
        Ваш логин для входа: ${data.username}
        Ваш пароль для входа: ${data.password}
        `;
        return (
            <div className="modal-wrapper">
                <div className="modal-header">
                    {this.props.modalTitle}
                </div>
                <div
                  className="modal-subheader"
                  onClick={this.generateLatter}
                  disabled={isDisabled}
                >
                    Сгенерировать письмо для сотрудника
                </div>
                <div className="modal-content">
                  <div className="modal-formfield">
                    <div className="modal-formfield-title">Фамилия Имя Отчество</div>
                    <Input
                        onChange={(e) => this.onHandlerFormField(e, 'name')}
                        value={data.name}
                        className="modal-field"
                        placeholder='Иванов Иван Иванович'
                    />
                  </div>
                  <div className="modal-formfield">
                    <div className="modal-formfield-title">Роль</div>
                      <Dropdown
                        className='modal-dropdown'
                        search
                        selection
                        options={options}
                        defaultValue={options[0].text}
                        onChange={(e, data) => this.changeIntent(data)}
                      />
                  </div>
                  <div className="modal-formfield">
                    <div className="modal-formfield-title">Логин или почта</div>
                    <Input
                        onChange={(e) => this.onHandlerFormField(e, 'username')}
                        value={data.username}
                        className="modal-field"
                        placeholder='example@gmail.com'
                    />
                  </div>
                  <div className="modal-formfield">
                    <div className="modal-formfield-title sapce-between">
                      Пароль
                      <span className='clickable-text' onClick={this.generatePassword}>
                        Сгенерировать
                      </span>
                    </div>
                    <Input
                        onChange={(e) => this.onHandlerFormField(e, 'password')}
                        value={data.password}
                        className="modal-field"
                        placeholder='examplePassword123'
                    />
                  </div>
                </div>
                {isShowUserMessage &&
                  <div className='message-to-user'>
                    {messageToUser}
                  </div>
                }
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
                    >
                    Сохранить
                    </div>
                  )}
                </div>
            </div>
        )
    }

    render() {
        // console.log(this.state.data.examples)
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
                content={this.renderContent()}
                closeIcon
            />
        );
    }
}

export default UserModal;
