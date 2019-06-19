import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
// import { Typography } from '@material-ui/core';
import { getCurrentUser } from '../../../../redux/actions/auth';
// import { LoadingLayout } from '../../layout';
import UrlRestoringService  from '../../../../services/url_restoring_service';
// import propTypes from './protected_container.prop_types';

class ProtectedContainerComponent extends Component {
//   static propTypes = propTypes;

  componentDidMount() {
    this.ensureAuthRequestWasSent();
  }

  componentDidUpdate() {
    this.ensureAuthRequestWasSent();
  }

  ensureAuthRequestWasSent() {
    if (!this.authRequestWasSent()) {
      this.props.getCurrentUser();
    }
  }

  authRequestWasSent() {
    return this.authRequestIsPending() || this.authRequestIsFinished();
  }

  authRequestIsPending() {
    return this.props.auth.pending;
  }

  authRequestIsFinished() {
    return this.props.auth.finished;
  }

  currentUserIsSet() {
    const currentUser = this.props.auth.user;
    return currentUser && typeof currentUser === 'object';
  }

  userIsAuthenticated() {
    return this.authRequestIsFinished() && this.currentUserIsSet();
  }

  userIsAuthorized() {
    const currentUser = this.props.auth.user;
    let { requiredRoles } = this.props;
    let { requiredAnyRoles } = this.props;

    //If nothing is provided.
    if (!requiredRoles && !requiredAnyRoles) {
      return true;
    }

    if (!requiredRoles && requiredAnyRoles) {

      if (!Array.isArray(requiredAnyRoles)) {
        requiredAnyRoles = [requiredAnyRoles];
      }

      let result = false;
      requiredAnyRoles.forEach(item => {
        if (currentUser.permissions[item]) {
          result = true;
        }
      });

      return result;

    } else {

      if (!Array.isArray(requiredRoles)) {
        requiredRoles = [requiredRoles];
      }

      let result = true;
      requiredRoles.forEach(item => {
        if (!currentUser.permissions[item]) {
           result = false;
        }
      });

      return result;

    }
  }

  renderLoadingIndicator() {
    return (
       <div>
          User Authentication in progress...
       </div>
    );
  }

  renderAuthFailure() {
    const { saveUrlOnFail, redirectOnFail } = this.props;

    if (saveUrlOnFail) {
      UrlRestoringService.setUrl(window.location.pathname);
    }

    if (redirectOnFail) {
      return <Redirect to={redirectOnFail} />;
    }

    return null;
  }

  render() {
    const { children } = this.props;

    if (!this.authRequestWasSent() || this.authRequestIsPending()) {
      return this.renderLoadingIndicator();
    }

    if (!this.userIsAuthenticated() || !this.userIsAuthorized()) {
      return this.renderAuthFailure();
    }

    return children;
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = dispatch => ({
  getCurrentUser: () => dispatch(getCurrentUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedContainerComponent);
