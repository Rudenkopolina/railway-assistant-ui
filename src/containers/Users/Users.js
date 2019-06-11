import React from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import UserTable from '../../components/UserTable';
import RoleTable from '../../components/RoleTable';
import Filter from './../../components/Filter';
import UserModal from '../../components/UserTable/UserModal';
import RoleModal from '../../components/RoleTable/RoleModal';

import { getAllUsers, createUser, deleteUser } from '../../redux/actions/users';
import { deletePrivilege, getPrivileges, createPrivilege } from '../../redux/actions/privileges';

import './Users.css';

class Users extends React.Component {
  state = {
    activeTab: 'users',
    titles: [
      { name: 'Сотрудники', key: 'users' },
      { name: 'Редактор Ролей', key: 'roles' }
    ],
    filterString: ''
  };

  componentWillMount() {
    this.props.getAllUsers();
    this.props.getPrivileges();
  }

  onFilterChange = filterString => {
    this.setState({ filterString });
  };

  changeTab = tab => {
    this.setState({ activeTab: tab });
  };

  onCreate = (title, data) => {
    switch (title) {
      case 'users':
        this.props.createUser(data);
        break;
      case 'roles':
        this.props.createPrivilege(data);
        break;
      default:
    }
    this.setState({ activeTab: title });
  };

  getContent = () => {
    const { activeTab, filterString } = this.state;
    const { users, onDeleteUser, roles } = this.props;
    switch (activeTab) {
      case 'users':
        return (
          <UserTable
            users={users}
            filterString={filterString}
            onDeleteUser={onDeleteUser}
          />
        );
      case 'roles':
        return (
          <RoleTable data={roles} onUpdateRole={this.props.onUpdateRole} />
        );
      default:
        return;
    }
  };

  render() {
    const { activeTab, titles, filterString } = this.state;
    return (
      <div className='users-container'>
        <div className='users-header'>
          <div className='users-menu'>
            {titles.map(title => (
              <div
                key={title.key}
                className={cx('users-menu-item', {
                  'users-menu-item-active': activeTab === title.key
                })}
                onClick={() => this.changeTab(title.key)}
              >
                {title.name}
              </div>
            ))}
            <div className='element-mb'>
              <Filter
                filterString={filterString}
                onFilterChange={this.onFilterChange}
              />
            </div>
          </div>
          <div className='users-menu-item element-mb'>
            <RoleModal
              buttonText='Cоздать роль'
              onSave={(data) => this.onCreate('roles', data)}
            />
            <UserModal
              buttonText='Добавить сотрудника'
              onSave={(data) => this.onCreate('users', data)}
            />
          </div>
        </div>
        {this.getContent()}
      </div>
    );
  }
}

const mapStateToProps = ({ users, privileges }) => ({
  users: users.users,
  privileges: privileges
});

const mapDispatchToProps = dispatch => ({
  createUser: data => dispatch(createUser(data)),
  getAllUsers: () => dispatch(getAllUsers()),
  onDeleteUser: id => dispatch(deleteUser(id)),
  onUpdateRole: data => dispatch(deletePrivilege(data)),
  getPrivileges: () => dispatch(getPrivileges()),
  createPrivilege: data => dispatch(createPrivilege(data))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Users)
);
