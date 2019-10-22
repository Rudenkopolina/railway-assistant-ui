import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import RoleCard from './RoleCard';

import { Table } from 'semantic-ui-react'
import './styles.css';
import { LABELS } from '../../constants/labels_en';

class RoleTable extends React.Component {
  render() {
    const { roles, onUpdateRole, permissions } = this.props;
    return (
      <div className='role-table-container'>
        <Table basic='very' padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell key={'role'}>{LABELS.ROLE}</Table.HeaderCell>
              {permissions.map(item => (
                <Table.HeaderCell key={item.id}>
                  {LABELS.PERMISSIONS_STRING[item.permission]}
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
