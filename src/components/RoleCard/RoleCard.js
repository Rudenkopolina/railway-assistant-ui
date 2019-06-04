import React from 'react';
import './styles.css';

const permissions = [
  'ALLOWED_USERS_CREATION',
  'ALLOWED_KNOWLEDGEBASE_VIEWING',
  'ALLOWED_KNOWLEDGEBASE_EDITING',
  'ALLOWED_ANSWERS_VIEWING',
  'ALLOWED_ANSWERS_EDITING',
  'ALLOWED_HISTORY_VIEWING'
];

class RoleCard extends React.Component {
  state = {
    data: this.props.data,
  }

  renderActions = () => {
    const { permissions } = this.props.data;
    const isPermissionsChanged = JSON.stringify(this.state.data.permissions.sort()) !== JSON.stringify(permissions.sort());
    return (
    <div className='table-actions'>
      <div className="table-action no-button">
      {isPermissionsChanged &&
        <div
        className="action-button"
        onClick={() => this.props.onSave(this.state.data)}
        >
          Сохранить
        </div>
      }
      </div>
    </div>
    )
  }

  handleCheckbox = value => {
    let newPermissions = this.state.data.permissions;
    if (this.state.data.permissions.includes(value)) {
      newPermissions = newPermissions.filter(item => item !== value);
    } else {
      newPermissions = [...newPermissions, value];
    }
    this.setState({ data: {...this.state.data, permissions: newPermissions}});
  }

  render() {
    const { data } = this.state;
    return (
        <div className="table-row-wrapper">
          <div className="table-row">
            <div className="table-number">{this.props.index + 1}</div>
            <div className="table-content">
                {data.name}
            </div>
            {permissions.map(item =>
              <div className="table-content checkbox-container" key={item}>
                <input
                  type="checkbox"
                  className='table-checkbox'
                  checked={data.permissions.includes(item)}
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

export default RoleCard;
