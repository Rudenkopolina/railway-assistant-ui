import { combineReducers } from 'redux';

import auth from './auth';
import responses from './responses';

export default combineReducers({
  auth,
  responses,
});
