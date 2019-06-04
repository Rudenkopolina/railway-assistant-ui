import React from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import UserTable from '../../components/UserTable/UserTable';
import RoleTable from '../../components/RoleTable/RoleTable';
import Filter from './../../components/Filter';
import UserModal from '../../components/UserModal';
import RoleModal from '../../components/RoleModal';

import {
  getAllUsers,
  createUser,
  deleteUser
} from '../../redux/actions/users';
import {
  updateRole,
  getAllRoles,
  createRole,
} from '../../redux/actions/roles';

import './Users.css';

class Users extends React.Component {
  state = {
    activeTab: 'users',
    titles: [
      {name: 'Сотрудники', key: 'users'},
      {name: 'Редактор Ролей', key: 'roles'}
    ],
    filterString: '',
  }

  componentWillMount() {
      this.props.getAllUsers();
      this.props.getAllRoles();
  }


  onFilterChange = filterString => {
    this.setState({ filterString });
  }

  changeTab = tab => {
    this.setState({ activeTab: tab});
  }

  getContent = () => {
    const { activeTab, filterString } =this.state;
    const { users, onDeleteUser, roles } = this.props;
    switch (activeTab) {
      case 'users':
        return (
          <UserTable
            data={users}
            filterString={filterString}
            onDeleteUser={onDeleteUser}
          />
        )
      case 'roles':
        return (
          <RoleTable
            data={roles}
            onUpdateRole={this.props.onUpdateRole}
          />
        )
      default: return;
    }
  }

  render() {
    const { activeTab, titles, filterString } =this.state;
    return (
      <div className="container">
        <div className="answer-header">
          <div className="answer-menu">
            {titles.map(title =>
              <div
                key={title.key}
                className={cx('answer-menu-item', { 'answer-menu-item-active': activeTab === title.key })}
                onClick={() => this.changeTab(title.key)}
              >
                {title.name}
              </div>
            )}
            <Filter filterString={filterString} onFilterChange={this.onFilterChange} />
          </div>
          <div className='answer-menu-item'>
            <RoleModal
              buttonText='создать роль'
              className='table-button'
              modalTitle='Создать роль'
              onSave={(data) => this.props.createUser(data)}
            />
            <UserModal
              buttonText='Добавить сотрудника'
              className='action-button'
              modalTitle='Добавить сотрудника'
              onSave={(data) => this.props.createUser(data)}
            />
          </div>
        </div>
        {this.getContent()}
      </div>
    );
  }
}

const mapStateToProps = ({ users, roles }) => ({
  users: users.users,
  roles: roles.roles
});

const mapDispatchToProps = dispatch => ({
	createUser: data => dispatch(createUser(data)),
  getAllUsers: () => dispatch(getAllUsers()),
  onDeleteUser: id => dispatch(deleteUser(id)),
  onUpdateRole: data => dispatch(updateRole(data)),
  getAllRoles: () => dispatch(getAllRoles()),
  createRole: data => dispatch(createRole(data)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Users));
