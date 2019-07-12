import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import RoleCard from './RoleCard';

import { Table } from 'semantic-ui-react'
import './styles.css';

const permissionsString = {ALLOWED_EVERYTHING:'Разрешено все', 
  ALLOWED_ANSWERS_EDITING: 'Редактирование ответов',
  ALLOWED_KNOWLEDGEBASE_EDITING: 'Редактирование базы знаний',
  ALLOWED_ANSWERS_VIEWING: 'Просмотр ответов',
  ALLOWED_KNOWLEDGEBASE_VIEWING: 'Просмотр базы знаний',
  ALLOWED_ANSWERS_CREATION: 'Создание ответов',
  ALLOWED_KNOWLEDGEBASE_CREATION: 'Создание базы знаний',
  ALLOWED_HISTORY_VIEWING: 'Просмотр истории',
  ALLOWED_HISTORY_EDITING: 'Редактирование истории',
  ALLOWED_USERS_CREATION: 'Создание пользователей',
  ALLOWED_USERS_EDITING: 'Редактирование пользователей',
  ALLOWED_KEYWORDS_VIEWING: 'Просмотр ключевых слов',
  ALLOWED_USERS_VIEWING: 'Просмотр пользователей',
  ALLOWED_ROLES_VIEWING: 'Просмотр ролей',
  ALLOWED_ROLES_EDITING: 'Редактирование ролей',
  ALLOWED_ROLES_CREATION: 'Создание ролей',
  ALLOWED_PERMISSION_VIEWING: 'Просмотр разрешений',
  ALLOWED_USAGE_STATISTICS_VIEWING: 'Просмотр статистики использования',
  ALLOWED_LOGS_VIEWING: 'Просмотр логов',
  ALLOWED_CONVERSATION_STATISTICS_VIEWING: 'Просмотр статистики разговоров',}

class RoleTable extends React.Component {
  render() {
    const { roles, onUpdateRole, permissions } = this.props;
    return (
      <div className='role-table-container'>
        <Table basic='very' padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell key={'role'}>Роль</Table.HeaderCell>
              {permissions.map(item => (
                <Table.HeaderCell key={item.id}>
                  {permissionsString[item.permission]}
                </Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {roles.map((item, index) => (
              <RoleCard key={index}
                permissions={permissions}
                role={item}
                onSave={onUpdateRole}></RoleCard>))}
          </Table.Body>
        </Table>
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
