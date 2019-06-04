import React from 'react';
import { withRouter } from 'react-router-dom';
import RoleCard from '../RoleCard/RoleCard';
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
    const { data, onUpdateRole } = this.props;
    return (
      <div className='answer-table-container'>
        {
          <div className="users-title-row">
            {titles.map(item =>
              <div className="role-title-content" key={item}>
                {item}
              </div>
            )}
          </div>
        }
        {data.map((item, index) => (
          <RoleCard
            key={index}
            data={item}
            index={index}
            onSave={onUpdateRole}
          />
        ))}
      </div>
    );
  }
}
export default withRouter(RoleTable);
