import { combineReducers } from 'redux';

import auth from './auth';
import users from './users';
import privileges from'./privileges';
import permissions from './permissions';
import responses from './responses';
import audios from './audios';
import categories from './categories';
import usageStatistics from './usageStatistics';
import environment from './environment';
import conversationStatistics from './conversationStatistics';
import conversationLogs from "./conversationLogs";
import intentLogs from "./intentLogs";
import availableIntents from "./availableIntents"

export default combineReducers({
  auth,
  responses,
  users,
  permissions,
  privileges,
  audios,
  categories,
  usageStatistics,
  environment,
  conversationStatistics,
  conversationLogs,
  intentLogs,
  availableIntents
});
