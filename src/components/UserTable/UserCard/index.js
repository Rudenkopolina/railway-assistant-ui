import React from 'react';
import { Modal, Icon } from 'semantic-ui-react';
import './styles.css';

class UserCard extends React.Component {
  renderActions = () => {
    const { user, onDeleteUser } = this.props;
    return (
      <div className='users-table-actions'>
        <Modal
          closeIcon
          trigger={<Icon size='small' name='trash' className='remove-icon' />}
          closeOnEscape={true}
          size={'mini'}
          content='Это действие нельзя будет отменить. Вы уверены, что хотите удалить этотого сотрудника из базы?'
          actions={[
            'Отменить',
            {
              key: 'done',
              content: 'Удалить',
              onClick: () => onDeleteUser(user.id)
            }
          ]}
        />
      </div>
    );
  };

  render() {
    const { user } = this.props;
    return (
      <div className='user-card-raw-wrapper'>
        <div className='user-card-content'>
          <div className='user-card-title'>
            <div className='user-overflow'> {user.name} </div>
            {this.renderActions()}
          </div>
          <div className='user-role'>{user.privilege}</div>
          <div className='user-card-description'>
            <a href={`mailto:${user.username}`} className='link'>
              {user.username}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default UserCard;
