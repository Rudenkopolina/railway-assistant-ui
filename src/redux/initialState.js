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
};

export const permissions = {
  permissions: [],
  pending: false,
  failed: false
};

export const audios = {
  playedId: null,
  audioUrl: null
};

export const usageStatistics = {
  speechToText: [],
  textToSpeech: [],
  textProcessor: []
};

export const environment = {
  environment: []
};

export const conversationStatistics = {
  distinctConversations: {
    statistics: [],
    oneDay: 0,
    threeDays: 0,
    fifteenDays: 0,
    thirtyDays: 0
  },
  stepsConversations: {
    statistics: [],
    oneDay: 0,
    threeDays: 0,
    fifteenDays: 0,
    thirtyDays: 0
  },
  durationConversations: {
    statistics: [],
    oneDay: 0,
    threeDays: 0,
    fifteenDays: 0,
    thirtyDays: 0
  }
};

export const conversationLogs = {
  conversations: [],
  pages: 0,
  selectedConversationMessages: []
};

export const intentLogs = {
  intents: [],
  pages: 0
};

export const availableIntents = {
  intents: []
};

export default {
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
};
