import React from 'react';
import { Route } from 'react-router-dom';
import Protected from '../container';

function ProtectedRouteComponent({ component: Component, requiredRoles, requiredAnyRoles, ...props }) {
  return (
    <Route {...props} render={() => (
      <Protected requiredRoles={requiredRoles} requiredAnyRoles={requiredAnyRoles} saveUrlOnFail redirectOnFail="/login">
        <Component {...props} />
      </Protected>
    )} />
  );
}

export default ProtectedRouteComponent;
