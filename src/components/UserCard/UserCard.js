import React from 'react';
import { Dropdown, Modal } from 'semantic-ui-react'
import IntentModal from '../IntentModal';
import './styles.css';

class UserCard extends React.Component {
  renderActions = () => {
    const {
      user,
      index,
      onUpdateAnswer,
    } = this.props;
    return (
    <div className='table-actions'>
      <div className="table-action">
        <Modal
          closeIcon
          trigger={<div className='table-button'>Удалить</div>}
          closeOnEscape={true}
          size={'mini'}
          content='Это действие нельзя отменить. Вы уверены, что хотите удалить этотого сотрудника из базы?'
          actions={['Отменить', { key: 'done', content: 'Удалить', onClick: (event) => this.deleteAnswer(event, user.id) }]}
        />
      </div>
      <div className="table-action">
        <IntentModal
          key={user.id}
          buttonText='Изменить'
          className="table-button"
          modalTitle=''
          onSave={(data) => onUpdateAnswer(data, user.id, index)}
          data={user}
        />
      </div>
    </div>
    )
  }

  render() {
    const {
      user,
      index,
      options
    } = this.props;
    return (
        <div className="table-row-wrapper">
          <div className="table-row">
            <div className="table-number">{index + 1}</div>
            <div className="table-content">
                {user.name}
            </div>
            <div className="table-content">
              <a href={`mailto:${user.username}`} className='link'>
                {user.username}
              </a>
            </div>
            <div className="table-content">
              <Dropdown
                className='table-dropdown'
                search
                selection
                options={options}
                value={user.privilege}
                disabled
                // onChange={(e, data) => this.changeIntent(data, index)}
              />
            </div>
            {this.renderActions()}
          </div>
        </div>
    );
  }
}

export default UserCard;
