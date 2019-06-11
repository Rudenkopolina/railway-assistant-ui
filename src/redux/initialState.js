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

export const categories = {
  categories: [],
  pending: false,
  failed: false
};

export const users = {
  users: [],
  pending: false,
  failed: false
};

export const privileges = {
  privileges: [],
  pending: false,
  failed: false
}

export const permissions = {
  permissions: [],
  pending: false,
  failed: false
}

export const audios = {
  playedId: null,
  audioUrl: null
};

export default {
  auth,
  responses,
  users,
  permissions,
  privileges,
  audios
};
