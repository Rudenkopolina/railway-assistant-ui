import React from 'react';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './styles.css';

import { logout } from '../../redux/actions/auth';
import { LABELS } from '../../constants/labels_en';

class Account extends React.Component {
  logOut = () => {
    this.props.logout();
    sessionStorage.removeItem('jwtToken');
  };

  render() {
    const { user } = this.props;
    return (
      <div className='account container'>
        <div className='account-info-wrapper'>
          <div className='account-icon'>
            <Icon name='user' size='massive' />
          </div>
          <div className='account-info'>
            <div className='account-info-title'>{LABELS.COMPANY}</div>
            <div className='account-info-value'>{user.group}</div>
          </div>
          <div className='account-info'>
            <div className='account-info-title'>{LABELS.USER_NAME}</div>
            <div className='account-info-value'>{user.username}</div>
          </div>
          {/* <div className='account-info'>
            <div className='account-info-title'>{LABELS.ROLE}</div>
            <div className='account-info-value'>{user.privilege}</div>
          </div> */}
          <div className='account-out' onClick={this.logOut}>
            {LABELS.LOG_OUT}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => auth;

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Account)
);
