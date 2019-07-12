import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react'
import './styles.css';



class RoleCard extends React.Component {
  // state = {
  //   role: this.props.role,
  // };

  // renderActions = () => {
  //   const { permissions } = this.props.role;
  //   const isPermissionsChanged = JSON.stringify(this.state.role.permissions.sort()) !== JSON.stringify(permissions.sort());
  //   return (
  //   <div className='role-table-actions'>
  //     <div className="role-table-action no-button">
  //     {isPermissionsChanged &&
  //       <div
  //       className="action-button"
  //       onClick={() => this.props.onSave(this.state.role)}
  //       >Сохранить
  //       </div>
  //     }
  //     </div>
  //   </div>
  //   )
  // };

  handleCheckbox = value => {
    const {role} = this.props
    console.log(value)
    let newPermissions = role.permissions;
    console.log(newPermissions);
    // if (this.state.role.permissions.includes(value)) {
    //   newPermissions = newPermissions.filter(item => item !== value);
    // } else {
    //   newPermissions = [...newPermissions, value];
    // }
    // this.setState({ role: {...this.state.role, permissions: newPermissions}});
  };

  render() {
    const { role, permissions } = this.props;
    return (
      <Table.Row>
        <Table.Cell>{role.type}</Table.Cell>
        {permissions.map((item, index) =>
          <Table.Cell key={index}>
            <input
              type="checkbox"
              className='role-table-checkbox'
              checked={role.permissions.find(p => (p.permission === item.permission))}
              onChange={() => this.handleCheckbox(item)}
            /></Table.Cell>)}
                {/* {this.renderActions()} */}
      </Table.Row>  
    );
  }
}

RoleCard.propTypes = {
  permissions: PropTypes.array.isRequired,
  role: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired
};

export default RoleCard;
