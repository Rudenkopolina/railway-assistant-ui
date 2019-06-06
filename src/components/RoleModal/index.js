import React from 'react';
import { Modal, Popup, Input, Dropdown } from 'semantic-ui-react';
import './styles.css';

const permissions = [
  {title: 'Просмотр и создание сотрудников', key: 'ALLOWED_USERS_CREATION'},
  {title: 'Просмотр базы знаний', key: 'ALLOWED_KNOWLEDGEBASE_VIEWING'},
  {title: 'Редактирование базы знаний', key: 'ALLOWED_KNOWLEDGEBASE_EDITING'},
  {title: 'Просмотр базовых ответов', key: 'ALLOWED_ANSWERS_VIEWING'},
  {title: 'Редактирование базовых ответов', key: 'ALLOWED_ANSWERS_EDITING'},
  {title: 'Просмотр истории', key: 'ALLOWED_HISTORY_VIEWING'}
];

class RoleModal extends React.Component {
  state = {
          isModalOpen: false,
          data: {
            name: '',
            permissions: []
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
        const { data } = this.state;
        this.props.onSave(data);
        this.setState({
          isModalOpen: false,
          data: {
            name: '',
            permissions: []
          }
        })
    }

    isDisabled = () => {
        const {
            name,
            permissions
        } = this.state.data;
        return !name || !permissions.length;
    }

    handleCheckbox = value => {
      let newPermissions = this.state.data.permissions;
      if (this.state.data.permissions.includes(value)) {
        newPermissions = newPermissions.filter(item => item !== value);
      } else {
        newPermissions = [...newPermissions, value];
      }
      this.setState({ data: {...this.state.data, permissions: newPermissions}});
    }

    renderContent = () => {
        const isDisabled = this.isDisabled();
        const { data } = this.state;

        return (
            <div className="modal-wrapper">
                <div className="modal-header">
                    {this.props.modalTitle}
                </div>
                <div className="modal-content">
                  <div className="modal-formfield">
                    <div className="modal-formfield-title">Роль</div>
                    <Input
                        onChange={(e) => this.onHandlerFormField(e, 'name')}
                        value={data.name}
                        className="modal-field"
                        placeholder='Администратор...'
                    />
                  </div>
                  <div className="modal-formfield">
                  <div className="modal-formfield-title">Права:</div>
                  {permissions.map(item =>
                    <div className='role-modal-labeld-checkbox'>
                      <input
                        type="checkbox"
                        className='role-table-checkbox'
                        // checked={data.permissions.includes(item)}
                        onChange={() => this.handleCheckbox(item.key)}
                      />
                      <span className='role-checkbox-label'>{item.title}</span>
                    </div>
                  )}
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

export default RoleModal;
