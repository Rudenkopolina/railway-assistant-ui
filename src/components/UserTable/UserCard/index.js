import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Icon } from 'semantic-ui-react';
import './styles.css';

class UserCard extends React.Component {
  deleteUser = (event, id) => {
    event.preventDefault();
    this.props.onDeleteUser(id);
  };

  renderActions = () => {
    const { user, onDeleteUser } = this.props;
    return (
      <div className='users-table-actions'>
        {onDeleteUser && (
          <Modal
            closeIcon
            trigger={<Icon size='small' name='trash' className='remove-icon' />}
            closeOnEscape={true}
            size={'mini'}
            content='Это действие нельзя будет отменить. Вы уверены, что хотите удалить этотого сотрудника из базы?'
            actions={[
              'Отменить',
              {
                key: 'remove',
                content: 'Удалить',
                className: 'negative',
                onClick: event => this.deleteUser(event, user.id)
              }
            ]}
          />
        )}
      </div>
    );
  };

  render() {
    const { user } = this.props;
    return (
      <div className='user-card-raw-wrapper'>
        <div className='user-card-content'>
          <div className='user-card-title'>
            <div className='user-overflow'> {user.surname} {user.name} </div>
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

UserCard.propTypes = {
  user: PropTypes.object.isRequired,
  onDeleteUser: PropTypes.func.isRequired
};

export default UserCard;
