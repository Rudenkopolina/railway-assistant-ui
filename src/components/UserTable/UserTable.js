import React from 'react';
import { withRouter } from 'react-router-dom';
import UserCard from '../UserCard/UserCard';
import './styles.css';

class UserTable extends React.Component {
  render() {
    const { data, filterString, onDeleteUser } = this.props;
    const filterStringLowerCase = filterString.toLowerCase();

    const filteredAnswers = filterStringLowerCase ?
          data.filter(user => user.name.toLowerCase().indexOf(filterStringLowerCase) > -1
          || user.username.toLowerCase().indexOf(filterStringLowerCase) > -1
          || user.privilege.toLowerCase().indexOf(filterStringLowerCase) > -1)
          :
          data;
    const titles = ['ФИО', 'Логин', 'Роль']
    return (
      <div className='users-table-container'>
        {
          <div className="users-title-row">
            {titles.map(item =>
              <div className="users-title-content" key={item}>
                {item}
              </div>
            )}
          </div>
        }
        {filteredAnswers.map((user, index) => (
          <UserCard
            key={index}
            user={user}
            index={index}
            onDeleteUser={onDeleteUser}
          />
        ))}
      </div>
    );
  }
}
export default withRouter(UserTable);
