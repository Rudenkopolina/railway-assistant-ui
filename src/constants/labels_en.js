export const LABELS = {
  HOME: 'Home',
  PROFILE: 'Profile',
  ANSWERS: 'Answers',
  EMPLOYEES: 'Employees',
  ROLES_EDITING: 'Roles editing',
  USAGE_STATISTICS: 'Usage Statistics',
  CONNECTED_ENVIRONMENT: 'Connected Environment',
  CONVERSATION_HISTORY: 'History',
  UNRECOGNIZED_INTENTS: 'Unrecognized Intents',
  MONITORING: 'Monitoring',

  LOGIN_INPUT: 'Enter login name',
  INCORRECT_INPUT: 'Incorrect login or password',
  LOGIN: 'Please sign up',
  SIGN_UP: 'Sign up',
  PASSWORD: 'Enter password',

  COMPANY: 'Company:',
  USER_NAME: 'User:',
  ROLE: 'Role:',
  LOG_OUT: 'Log out',

  COMMON: 'Common answers',
  REFERENCE: 'Special answers',

  START_PROCESSING_INFO: 'Processing of answer #',
  NOTIFICATION_INFO: 'Info',
  END_PROCESSING_INFO_START: 'Answer #',
  END_PROCESSING_INFO_END: 'processed successfully',
  NOTIFICATION_SUCCESS: 'Success',

  FILTER_LABEL: 'Filter',
  DETAILS_BUTTON_LABEL: 'Details',
  ADD_BUTTON_LABEL: 'Add',
  ADD_ANSWER_BUTTON_LABEL: 'Add answers',

  REMOVAL_CONFIRMATION:
    'Are you sure you want delete this answer? It will be lost beyond recovery',
  CANCEL: 'Cancel',
  DELETE: 'Delete',
  SAVE: 'Save',
  REFRESH: 'Refresh',

  TITLES_FOR_MODAL: {
    common: 'Change common answer',
    reference: 'Change special answer'
  },

  ADD_NEW_ANSWER: 'Add answer',
  ADD_NEW_CATEGORY: 'Add category',
  NEW_CATEGORY_NAME_PLACEHOLDER: 'Category name...',
  NEW_ANSWER_NAME_PLACEHOLDER: 'Information about..',
  NEW_ANSWER_DESCRIPTION_PLACEHOLDER: 'This answer is...',

  HINT:
    'To transmit the words-omographs, use +  before vowel. To make a pause between words, use -.',
  KEYWORDS_SENT: `Keywords are the words that appear in the question as the user would ask`,
  KEYWORDS_LIST: [
    'Keyword must be unique',
    'You can add several keywords with different formulations and forms, as well as synonyms of words.',
    'Keyword may contain letters, numbers, underscores and hyphens.',
    'Do not add spaces in keywords',
    "Keyword can't be longer than 64 characters."
  ],

  ANSWER_NAME_LABEL: 'Name',
  ANSWER_DESCRIPTION_LABEL: 'Description',
  ANSWER_CATEGORY_LABEL: 'Category',
  ANSWER_KEYWORDS_LABEL: 'Keywords',
  ANSWER_VOICE_LABEL: 'Voice answer',
  RECORD_BUTTON_LABEL: 'Record answer',
  ANSWER_TEXT_LABEL: 'Text answer',
  NO_SUPPORT: 'There is no speech generation support for your region',
  BACK_TO_GENERATION: 'Back to generation',
  RERECORD: 'Rerecord',
  START_RECORD: 'Record',
  STOP_RECORD: 'Stop',
  SAVE_RECORD: 'Save record',
  PLAY: 'Play answer',
  STOP: 'Stop',

  CREATE_ROLE: 'Create role',
  ADD_EMPLOYEE: 'Add employee',

  LOAD_MORE: 'Load more',
  START_DATE: 'Date of start',
  END_DATE: 'Date of end',
  STEPS: 'Number of steps',
  SESSION: 'Session',
  TYPE: 'Тype',
  MESSAGE: 'Message',
  MESSAGE_DATE: 'Date',
  RECOGNIZED_INTENT: 'Recognizeed intent',
  CORRECTED_INTENT: 'Corrected intent',
  REQUEST: 'Request',

  ACTIVE: 'Active',
  NON_ACTIVE: 'No active',
  LOADING: 'Loading',
  UPDATED: 'Updated',

  CONVERSATION_STATISTICS: 'Conversation statistics',
  SERVICES_USAGE_STATISTICS: 'Services usage statistics',
  REQUESTS_NUM: 'Requests',

  TIME_INTERVALS: ['24 hours', '72 hours', '15 days', '30 days'],
  TIME_INTERVALS_STRING: ['oneDay', 'threeDays', 'fifteenDays', 'thirtyDays'],
  STATISTICS_HEADERS: [
    'Total number of conversations: ',
    'Average number of steps in a conversation: ',
    'Average duration of conversation (in seconds): '
  ],
  STATISTICS_HEADERS_STRING: [
    'distinctConversations',
    'stepsConversations',
    'durationConversations'
  ],
  USAGE_STATISTICS_HEADERS: [
    'Speech To Text, number of requests: ',
    'Text To Speech, number of requests: ',
    'Text Processor, number of requests: '
  ],
  USAGE_STATISTICS_HEADERS_STRING: [
    'speechToText',
    'textToSpeech',
    'textProcessor'
  ],

  VOICE: 'Voice',
  TEXT: 'Text',
  MIXED: 'Mixed',
  UNKN: 'Unknown',

  SYSTEM_RECOGNITION_INFO_START: "System recognized intent '",
  SYSTEM_RECOGNITION_INFO_END: "' with probability",
  INACCESSIBLE_INFO: 'Intent information is inaccessible',
  USER_MESSAGE: 'User message',
  CHANGE_INTENT: 'Change intent',
  INTENT_CHANGED: 'Intent changed to',

  BEGINNING: 'Start: ',
  DURATION: 'Duration: ',
  SECONDS: 'seconds',

  SENT_FROM_TELEGRAM: 'Sent from Telegram',
  SENT_FROM_VIBER: 'Sent from Viber',
  SENT_FROM_MIXED: 'Mixed ways of sending',
  SENT_FROM_PSTN: 'Sent from PSTN',
  SENT_FROM_UNKN: 'Source is unknown',

  USER: 'User',
  SYSTEM: 'System',

  EXISTING_KEY_ERROR: 'Key is already exist',
  KEY_IS_ALREADY_USED_ERROR: 'Key is already using in system answer',
  KEY_IS_ALREADY_USED_IN_ERROR: 'Key is already using in ',
  NO_ANSWERS: 'There is no answers in this category',
  NOTHING_FOUND_START: 'Request ',
  NOTHING_FOUND_END: 'has no responses',
  DROPDOWN_SELECTED: 'Picked answers: ',
  CHOOSE_WHAT_TO_DROPDOWN: 'Pick a category to move',
  MOVE: 'Move',

  PERMISSIONS_STRING: {
    ALLOWED_EVERYTHING: 'Allowed everything',
    ALLOWED_ANSWERS_EDITING: 'Allowed answers editing',
    ALLOWED_KNOWLEDGEBASE_EDITING: 'Allowed knowledgebase editind',
    ALLOWED_ANSWERS_VIEWING: 'Allowed answers viewing',
    ALLOWED_KNOWLEDGEBASE_VIEWING: 'Allowed knowledgebase viewing',
    ALLOWED_ANSWERS_CREATION: 'Allowed answers creation',
    ALLOWED_KNOWLEDGEBASE_CREATION: 'Allowed knowledgebase creation',
    ALLOWED_HISTORY_VIEWING: 'Allowed history viewing',
    ALLOWED_HISTORY_EDITING: 'Allowed history editing',
    ALLOWED_USERS_CREATION: 'Allowed user creation',
    ALLOWED_USERS_EDITING: 'Allowed user editing',
    ALLOWED_KEYWORDS_VIEWING: 'Allowed keywords viewing',
    ALLOWED_USERS_VIEWING: 'Allowed users viewing',
    ALLOWED_ROLES_VIEWING: 'Allowed roles viewing',
    ALLOWED_ROLES_EDITING: 'Allowed roles editing',
    ALLOWED_ROLES_CREATION: 'Allowed roles creation',
    ALLOWED_PERMISSION_VIEWING: 'Allowed permissions viewing',
    ALLOWED_USAGE_STATISTICS_VIEWING: 'Allowed usage statistics viewing',
    ALLOWED_LOGS_VIEWING: 'Allowed logs viewing',
    ALLOWED_CONVERSATION_STATISTICS_VIEWING: 'Allowed conversation statistics viewing'
  },

  USER_REMOVAL_CONFIRMATION: 'Are you sure you want delete this user? It will be lost beyond recovery',
  PERMISSIONS: 'Permissions',
  INPUTS_NOT_FILLED: 'All fields must be filled in',
  REGISTRATION_NOTIFICATION: ' you have been registered in system',
  USER_LOGIN: 'Your login ',
  USER_PASSWORD: 'Your password ',
  SURNAME: 'Surname ',
  NAME: 'Name ',
  PATRONYMIC: 'Patronymic',
  LOGIN_OR_MAIL: 'Login or mail ',
  PASS: 'Password',
  GENERATE_PASS: 'Generate password',
  GENERATE_LETTER: 'Generate letter for new employee',
};
