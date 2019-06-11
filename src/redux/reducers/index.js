import { combineReducers } from 'redux';

import auth from './auth';
import users from './users';
import privileges from'./privileges';
import permissions from './permissions';
import responses from './responses';
import audios from './audios';
import categories from './categories';

export default combineReducers({
  auth,
  responses,
  users,
  permissions,
  privileges,
  audios,
  categories
});
