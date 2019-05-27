import React from 'react';
import { Route } from 'react-router-dom';
import Protected from '../container';

function ProtectedRouteComponent({ component: Component, requiredRoles, ...props }) {
  return (
    <Route {...props} render={() => (
      <Protected requiredRoles={requiredRoles} saveUrlOnFail redirectOnFail="/login">
        <Component {...props} />
      </Protected>
    )} />
  );
}

export default ProtectedRouteComponent;
