import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import UserCard from './UserCard';
import './styles.css';
import NoFilteredData from "./NoFilteredData";

class UserTable extends React.Component {
  render() {
    const { users, filterString, onDeleteUser } = this.props;
    const filterStringLowerCase = filterString.toLowerCase();

    const filteredAnswers = filterStringLowerCase ?
          users.filter(user => user.name.toLowerCase().indexOf(filterStringLowerCase) > -1
          || user.username.toLowerCase().indexOf(filterStringLowerCase) > -1
          || user.privilege.toLowerCase().indexOf(filterStringLowerCase) > -1)
          :
          users;

    if (filteredAnswers.length === 0) {
      return <NoFilteredData filterString={filterString} />;
    }

    return (
      <div className='users-table-container'>
        {filteredAnswers.map((user, index) => (
          <UserCard
            key={index}
            user={user}
            onDeleteUser={onDeleteUser}
          />
        ))}
      </div>
    );
  }
}
UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  onDeleteUser: PropTypes.func.isRequired,
  filterString: PropTypes.string.isRequired
};

export default withRouter(UserTable);
