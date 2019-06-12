import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import RoleCard from './RoleCard';
import './styles.css';

const titles = [
  'Роль',
  'Просмотр и создание сотрудников',
  'Просмотр базы знаний',
  'Редактирование базы знаний',
  'Просмотр базовых ответов',
  'Редактирование базовых ответов',
  'Просмотр истории'
]

class RoleTable extends React.Component {
  render() {
    const { roles, onUpdateRole, permissions } = this.props;
    return (
      <div className='role-table-container'>
        {
          <div>
            {permissions.map(item =>
              <div key={item.id}>
                {item.permission}
              </div>
            )}
          </div>
        }
        {roles.map((item, index) => (
          <RoleCard
            key={index}
            role={item}
            onSave={onUpdateRole}
          />
        ))}
      </div>
    );
  }
}
RoleTable.propTypes = {
  roles: PropTypes.array.isRequired, 
  permissions: PropTypes.array.isRequired,
  onUpdateRole: PropTypes.func.isRequired
};
export default withRouter(RoleTable);
