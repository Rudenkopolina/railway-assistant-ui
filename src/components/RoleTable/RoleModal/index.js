import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Popup, Input, Button } from 'semantic-ui-react';
import './styles.css';
import { LABELS } from '../../../constants/labels_en';

const permissions = [
  { title: LABELS.ALLOWED_USERS_CREATION, key: 'ALLOWED_USERS_CREATION' },
  { title: LABELS.ALLOWED_KNOWLEDGEBASE_VIEWING, key: 'ALLOWED_KNOWLEDGEBASE_VIEWING' },
  { title: LABELS.ALLOWED_KNOWLEDGEBASE_EDITING, key: 'ALLOWED_KNOWLEDGEBASE_EDITING' },
  { title: LABELS.ALLOWED_ANSWERS_VIEWING, key: 'ALLOWED_ANSWERS_VIEWING' },
  { title: LABELS.ALLOWED_ANSWERS_EDITING, key: 'ALLOWED_ANSWERS_EDITING' },
  { title: LABELS.ALLOWED_HISTORY_VIEWING, key: 'ALLOWED_HISTORY_VIEWING' }
];

class RoleModal extends React.Component {
  state = {
    isModalOpen: false,
    data: {
      name: '',
      permissions: []
    }
  };

  onHandlerFormField = (e, title) => {
    const { data } = this.state;
    this.setState({ data: { ...data, [title]: e.target.value } });
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
        name: '',
        permissions: []
      }
    });
  };

  isDisabled = () => {
    const { name, permissions } = this.state.data;
    return !name || !permissions.length;
  };

  handleCheckbox = value => {
    let newPermissions = this.state.data.permissions;
    if (this.state.data.permissions.includes(value)) {
      newPermissions = newPermissions.filter(item => item !== value);
    } else {
      newPermissions = [...newPermissions, value];
    }
    this.setState({
      data: { ...this.state.data, permissions: newPermissions }
    });
  };

  renderContent = () => {
    const isDisabled = this.isDisabled();
    const { data } = this.state;

    return (
      <div className='modal-wrapper'>
        <div className='modal-header'>{this.props.modalTitle}</div>
        <div className='modal-content'>
          <div className='modal-formfield'>
            <div className='modal-formfield-title'>{LABELS.ROLE}</div>
            <Input
              onChange={e => this.onHandlerFormField(e, 'name')}
              value={data.name}
              className='modal-field'
              placeholder=''
            />
          </div>
          <div className='modal-formfield'>
            <div className='modal-formfield-title'>{LABELS.PERMISSIONS}</div>
            {permissions.map((item, index) => (
              <div key={index} className='role-modal-labeld-checkbox'>
                <input
                  type='checkbox'
                  className='role-table-checkbox'
                  // checked={data.permissions.includes(item)}
                  onChange={() => this.handleCheckbox(item.key)}
                />
                <span className='role-checkbox-label'>{item.title}</span>
              </div>
            ))}
          </div>
        </div>
        <div className='modal-actions'>
          <div
            onClick={this.onTrigerModal}
            className='action-button grey-button'
          >
            {LABELS.CANCEL}
          </div>
          {isDisabled ? (
            <Popup
              content={LABELS.INPUTS_NOT_FILLED}
              position='right center'
              className='modal-hint'
              trigger={
                <div className='action-button-disabled'>{LABELS.SAVE}</div>
              }
            />
          ) : (
            <div onClick={this.onSendData} className='action-button'>
              {LABELS.SAVE}
            </div>
          )}
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

RoleModal.propTypes = {
  buttonText: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired
};

export default RoleModal;
