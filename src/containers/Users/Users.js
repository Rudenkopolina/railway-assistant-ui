import React from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import UserTable from '../../components/UserTable';
import RoleTable from '../../components/RoleTable';
import Filter from './../../components/Filter';
import Protected from '../../components/common/protected/container';
import UserModal from '../../components/UserTable/UserModal';
// import RoleModal from '../../components/RoleTable/RoleModal';
import { getAllUsers, createUser, deleteUser } from '../../redux/actions/users';
import { deletePrivilege, getPrivileges, createPrivilege } from '../../redux/actions/privileges';
import { getPermissions } from '../../redux/actions/permissions';

import './Users.css';

class Users extends React.Component {
  state = {  
      activeTab: '',
      titles: [],
      filterString: ''
  };

  componentWillMount() {
    const { user } = this.props.auth;
    const titles = [];
    if (user.permissions.ALLOWED_USERS_VIEWING) {
      titles.push({
        name: 'Сотрудники',
        key: 'users',
        requiredRoles: 'ALLOWED_USERS_VIEWING'
      });
      this.props.getAllUsers();
    }
    if (user.permissions.ALLOWED_ROLES_EDITING) {
      // titles.push({
      //   name: 'Редактор Ролей',
      //   key: 'roles',
      //   requiredRoles: 'ALLOWED_ROLES_EDITING'
      // });
      this.props.getPrivileges();
      this.props.getPermissions();
    }
    this.setState({ titles, activeTab: titles[0].key });
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
    const { users, deleteUser, privileges, permissions } = this.props;
    switch (activeTab) {
      case 'users':
        return (
          <Protected requiredRoles='ALLOWED_USERS_VIEWING'>
          <UserTable
            users={users.users}
            filterString={filterString}
            onDeleteUser={deleteUser}
          />
          </Protected>
        );
      case 'roles':
        return (
          <Protected requiredRoles='ALLOWED_ROLES_EDITING'>
          <RoleTable roles={privileges.privileges} onUpdateRole={this.props.onUpdateRole} permissions={permissions.permissions} />
          </Protected>
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
            {/* <RoleModal
              buttonText='Cоздать роль'
              onSave={(data) => this.onCreate('roles', data)}
            /> */}
            <UserModal
              buttonText='Добавить сотрудника' roles={this.props.privileges.privileges}
              onSave={user => {
                this.props.createUser(user);
              }}
            />
          </div>
        </div>
        {this.getContent()}
      </div>
    );
  }
}

const mapStateToProps = ({ users, auth, privileges, permissions }) => ({
  users, privileges, auth, permissions
});

const mapDispatchToProps = dispatch => ({
  createUser: data => dispatch(createUser(data)),
  getAllUsers: () => dispatch(getAllUsers()),
  deleteUser: id => dispatch(deleteUser(id)),
  onUpdateRole: data => dispatch(deletePrivilege(data)),
  getPrivileges: () => dispatch(getPrivileges()),
  getPermissions: () => dispatch(getPermissions()),
  createPrivilege: data => dispatch(createPrivilege(data))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Users)
);
