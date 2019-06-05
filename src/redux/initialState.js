export const auth = {
  user: null,
  pending: false,
  finished: false
};

export const responses = {
  commonResponses: [],
  referenceResponses: [],
  pending: false,
  failed: false
};

export const users = {
  users: [],
  pending: false,
  failed: false
};

export const roles = {
  roles: [],
  pending: false,
  failed: false
};

export default {
  auth,
  responses,
  users,
  roles
};
