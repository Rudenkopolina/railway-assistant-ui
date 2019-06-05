import { combineReducers } from 'redux';

import auth from './auth';
import responses from './responses';
import users from './users';
import roles from './roles';
import audios from './audios';

export default combineReducers({
  auth,
  responses,
  users,
  roles,
  audios
});
