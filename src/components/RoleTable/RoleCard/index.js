import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

// const permissions = [
//   'ALLOWED_USERS_CREATION',
//   'ALLOWED_KNOWLEDGEBASE_VIEWING',
//   'ALLOWED_KNOWLEDGEBASE_EDITING',
//   'ALLOWED_ANSWERS_VIEWING',
//   'ALLOWED_ANSWERS_EDITING',
//   'ALLOWED_HISTORY_VIEWING'
// ];

class RoleCard extends React.Component {
  state = {
    role: this.props.role,
  };

  renderActions = () => {
    const { permissions } = this.props.role;
    const isPermissionsChanged = JSON.stringify(this.state.role.permissions.sort()) !== JSON.stringify(permissions.sort());
    return (
    <div className='role-table-actions'>
      <div className="role-table-action no-button">
      {isPermissionsChanged &&
        <div
        className="action-button"
        onClick={() => this.props.onSave(this.state.role)}
        >
          Сохранить
        </div>
      }
      </div>
    </div>
    )
  };

  handleCheckbox = value => {
    let newPermissions = this.state.role.permissions;
    if (this.state.role.permissions.includes(value)) {
      newPermissions = newPermissions.filter(item => item !== value);
    } else {
      newPermissions = [...newPermissions, value];
    }
    this.setState({ role: {...this.state.role, permissions: newPermissions}});
  };

  render() {
    const { role } = this.props;
    return (
        <div className="role-table-row-wrapper">
          <div className="role-table-row">
            <div className="role-table-number">{role.id}</div>
            <div className="role-table-content">
                {role.type}
            </div>
            {role.permissions.map((item, index) =>
              <div className="role-table-content checkbox-container" key={index}>
                <input
                  type="checkbox"
                  className='role-table-checkbox'
                  checked={role.permissions.includes(item)}
                  onChange={() => this.handleCheckbox(item)}
                />
              </div>
            )}
            {this.renderActions()}
          </div>
        </div>
    );
  }
}
RoleCard.propTypes = {
  role: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired
};

export default RoleCard;
