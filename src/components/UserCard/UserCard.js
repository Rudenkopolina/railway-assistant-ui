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
    <div className='table-actions'>
      <div className="table-action">
        <Modal
          closeIcon
          trigger={<div className='table-button'>Удалить</div>}
          closeOnEscape={true}
          size={'mini'}
          content='Это действие нельзя отменить. Вы уверены, что хотите удалить этотого сотрудника из базы?'
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
              {user.privilege}
            </div>
            {this.renderActions()}
          </div>
        </div>
    );
  }
}

export default UserCard;
