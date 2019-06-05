import { combineReducers } from 'redux';

import auth from './auth';
import responses from './responses';
import users from './users';
import roles from './roles';

export default combineReducers({
  auth,
  responses,
  users,
  roles
});
