import React from 'react';
import { Modal } from 'semantic-ui-react'
import './styles.css';

class UserCard extends React.Component {
  renderActions = () => {
    const {
      user,
      onDeleteUser
    } = this.props;
    return (
    <div className='users-table-actions'>
      <div className="users-table-action">
        <Modal
          closeIcon
          trigger={<div className='users-table-button'>Удалить</div>}
          closeOnEscape={true}
          size={'mini'}
          content='Это действие нельзя будет отменить. Вы уверены, что хотите удалить этотого сотрудника из базы?'
          actions={['Отменить', { key: 'done', content: 'Удалить', onClick: () => onDeleteUser(user.id) }]}
        />
      </div>
    </div>
    )
  }

  render() {
    const {
      user,
      index
    } = this.props;
    return (
        <div className="users-table-row-wrapper">
          <div className="users-table-row">
            <div className="users-table-number">{index + 1}</div>
            <div className="users-table-content">
                {user.name}
            </div>
            <div className="users-table-content">
              <a href={`mailto:${user.username}`} className='link'>
                {user.username}
              </a>
            </div>
            <div className="users-table-content">
              {user.privilege}
            </div>
            {this.renderActions()}
          </div>
        </div>
    );
  }
}

export default UserCard;
