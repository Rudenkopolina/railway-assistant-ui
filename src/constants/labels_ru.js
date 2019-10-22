export const LABELS = {
  HOME: 'Домашняя страница',
  PROFILE: 'Профиль',
  ANSWERS: 'Ответы',
  EMPLOYEES: 'Сотрудники',
  ROLES_EDITING: 'Редактор ролей',
  USAGE_STATISTICS: 'Статистика использования',
  CONNECTED_ENVIRONMENT: 'Подключённое окружение',
  CONVERSATION_HISTORY: 'История разговоров',
  UNRECOGNIZED_INTENTS: 'Нераспознанные намерения',
  MONITORING: 'Мониторинг',

  LOGIN_INPUT: 'Введите логин',
  INCORRECT_INPUT: 'Неверный логин или пароль',
  LOGIN: 'Пожалуйста, выполните вход',
  SIGN_UP: 'Войти',
  PASSWORD: 'Введите пароль',

  COMPANY: 'Название организации:',
  USER_NAME: 'Имя пользователя:',
  ROLE: 'Роль:',
  LOG_OUT: 'Выйти из системы',

  COMMON: 'Базовые сообщения',
  REFERENCE: 'База знаний',

  START_PROCESSING_INFO: 'Начинается обработка ответа #',
  NOTIFICATION_INFO: 'Информация',
  END_PROCESSING_INFO_START: 'Ответ #',
  END_PROCESSING_INFO_END: 'успешно обработан!',
  NOTIFICATION_SUCCESS: 'Успешно',

  FILTER_LABEL: 'Фильтр',
  DETAILS_BUTTON_LABEL: 'Детали',
  ADD_BUTTON_LABEL: 'Добавить',
  ADD_ANSWER_BUTTON_LABEL: 'Добавить ответ',

  REMOVAL_CONFIRMATION:
    'Вы уверены, что хотите удалить этот ответ? Ответ будет потерян без возможности восстановления',
  CANCEL: 'Отменить',
  DELETE: 'Удалить',
  SAVE: 'Сохранить',
  REFRESH: 'Обновить',

  TITLES_FOR_MODAL: {
    common: 'Изменить типовую фразу',
    reference: 'Изменить справочный ответ'
  },

  ADD_NEW_ANSWER: 'Добавить справочный ответ',
  ADD_NEW_CATEGORY: 'Создать новую категорию',
  NEW_CATEGORY_NAME_PLACEHOLDER: 'Введите название...',
  NEW_ANSWER_NAME_PLACEHOLDER: 'Справка о...',
  NEW_ANSWER_DESCRIPTION_PLACEHOLDER: 'Данный ответ будет ...',

  HINT:
    'Для передачи слов-омографов используйте + перед ударной гласной. Например, гот+ов.Чтобы отметить паузу между словами, используйте -.',
  KEYWORDS_SENT: `Ключевые слова - слова, которые фигурируют в вопросе так, как это спросил бы пользователь.`,
  KEYWORDS_LIST: [
    'Ключевое слово должно быть уникальным.',
    'Вы можете добавлять несколько ключевых слов с разными формулировками и формами, а также синонимы слов.',
    'Ключевое слово может содержать буквы, цифры, подчеркивания и дефисы.',
    'Не включайте пробелы в ключевые слова.',
    'Ключевое слово не может быть длиннее 64 символов.'
  ],

  ANSWER_NAME_LABEL: 'Название',
  ANSWER_DESCRIPTION_LABEL: 'Описание',
  ANSWER_CATEGORY_LABEL: 'Категория',
  ANSWER_KEYWORDS_LABEL: 'Ключевые слова',
  ANSWER_VOICE_LABEL: 'Голосовой ответ',
  ANSWER_TEXT_LABEL: 'Текстовый ответ',
  RECORD_BUTTON_LABEL: 'Записать ответ',
  NO_SUPPORT: 'Для вашего региона нет поддержки генерации речи',
  BACK_TO_GENERATION: 'Вернуться к генерации',
  RERECORD: 'Перезаписать',
  START_RECORD: 'Запись',
  STOP_RECORD: ' Остановить запись',
  SAVE_RECORD: 'Сохранить запись',
  PLAY: 'Вопроизвести голосовой ответ',
  STOP: 'Остановить воспроизведение',

  CREATE_ROLE: 'Создать роль',
  ADD_EMPLOYEE: 'Добавить сотрудника',

  LOAD_MORE: 'Загрузить ещё',
  START_DATE: 'Дата начала',
  END_DATE: 'Дата конца',
  STEPS: 'Количество шагов',
  SESSION: 'Сессия',
  TYPE: 'Тип',
  MESSAGE: 'Сообщение',
  MESSAGE_DATE: 'Дата сообщения',
  RECOGNIZED_INTENT: 'Распознаное системой намерение',
  CORRECTED_INTENT: 'Скорректированное намерение',
  REQUEST: 'Текст запроса',

  ACTIVE: 'Активно',
  NON_ACTIVE: 'Не активно',
  LOADING: 'Обновляется',
  UPDATED: 'Обновлено',

  CONVERSATION_STATISTICS: 'Статистика разговоров',
  SERVICES_USAGE_STATISTICS: 'Статистика использования сервисов',
  REQUESTS_NUM: 'Обращений',

  TIME_INTERVALS: ['24 часа', '72 часа', '15 дней', '30 дней'],
  TIME_INTERVALS_STRING: ['oneDay', 'threeDays', 'fifteenDays', 'thirtyDays'],
  STATISTICS_HEADERS: [
    'Общее число обращений: ',
    'Среднее количество шагов в обращении: ',
    'Средняя длительность обращения (в секундах): '
  ],
  STATISTICS_HEADERS_STRING: [
    'distinctConversations',
    'stepsConversations',
    'durationConversations'
  ],
  USAGE_STATISTICS_HEADERS: [
    'Преобразователь голоса в текст, количество запросов: ',
    'Преобразователь текста в голос, количество запросов: ',
    'Обработчик текстовых сообщений, количество запросов: '
  ],
  USAGE_STATISTICS_HEADERS_STRING: [
    'speechToText',
    'textToSpeech',
    'textProcessor'
  ],

  VOICE: 'Голос',
  TEXT: 'Текст',
  MIXED: 'Смешанный',
  UNKN: 'Неизвестен',

  SYSTEM_RECOGNITION_INFO_START: "Системой было определено намерение '",
  SYSTEM_RECOGNITION_INFO_END: "' с вероятностью",
  INACCESSIBLE_INFO: 'Информация о намерениях не доступна',
  USER_MESSAGE: 'Сообщение пользователя',
  CHANGE_INTENT: 'Изменить намерение',
  INTENT_CHANGED: 'Намерение исправлено на ',

  BEGINNING: 'Начало: ',
  DURATION: ' Продолжительность: ',
  SECONDS: 'секунды',

  SENT_FROM_TELEGRAM: 'Отправлено из Telegram',
  SENT_FROM_VIBER: 'Отправлено из Viber',
  SENT_FROM_MIXED: 'Смешанные способы отправки',
  SENT_FROM_PSTN: 'Отправлено из телефонной сети',
  SENT_FROM_UNKN: 'Источник неизвестен',

  USER: 'Пользователь',
  SYSTEM: 'Система',

  EXISTING_KEY_ERROR: 'Такой ключ уже есть',
  KEY_IS_ALREADY_USED_ERROR: 'Ключ уже используется в системном ответе',
  KEY_IS_ALREADY_USED_IN_ERROR: 'Ключ уже используется в ',
  NO_ANSWERS: 'В данной категории пока нет ответов',
  NOTHING_FOUND_START: 'По запросу',
  NOTHING_FOUND_END: 'ничего не найдено',
  DROPDOWN_SELECTED: 'Выбрано ответов: ',
  CHOOSE_WHAT_TO_DROPDOWN: 'Выберите категорию для перемещения: ',
  MOVE: 'Переместить',

  PERMISSIONS_STRING: {
    ALLOWED_EVERYTHING: 'Разрешено все',
    ALLOWED_ANSWERS_EDITING: 'Редактирование ответов',
    ALLOWED_KNOWLEDGEBASE_EDITING: 'Редактирование базы знаний',
    ALLOWED_ANSWERS_VIEWING: 'Просмотр ответов',
    ALLOWED_KNOWLEDGEBASE_VIEWING: 'Просмотр базы знаний',
    ALLOWED_ANSWERS_CREATION: 'Создание ответов',
    ALLOWED_KNOWLEDGEBASE_CREATION: 'Создание базы знаний',
    ALLOWED_HISTORY_VIEWING: 'Просмотр истории',
    ALLOWED_HISTORY_EDITING: 'Редактирование истории',
    ALLOWED_USERS_CREATION: 'Создание пользователей',
    ALLOWED_USERS_EDITING: 'Редактирование пользователей',
    ALLOWED_KEYWORDS_VIEWING: 'Просмотр ключевых слов',
    ALLOWED_USERS_VIEWING: 'Просмотр пользователей',
    ALLOWED_ROLES_VIEWING: 'Просмотр ролей',
    ALLOWED_ROLES_EDITING: 'Редактирование ролей',
    ALLOWED_ROLES_CREATION: 'Создание ролей',
    ALLOWED_PERMISSION_VIEWING: 'Просмотр разрешений',
    ALLOWED_USAGE_STATISTICS_VIEWING: 'Просмотр статистики использования',
    ALLOWED_LOGS_VIEWING: 'Просмотр логов',
    ALLOWED_CONVERSATION_STATISTICS_VIEWING: 'Просмотр статистики разговоров'
  },

  USER_REMOVAL_CONFIRMATION: 'Это действие нельзя будет отменить. Вы уверены, что хотите удалить этотого сотрудника из базы?',
  PERMISSIONS: 'Права',
  INPUTS_NOT_FILLED: 'Все данные должны быть заполнены',
  REGISTRATION_NOTIFICATION: ', вы были зарегистрированы в системе.',
  USER_LOGIN: 'Ваш логин для входа',
  USER_PASSWORD: 'Ваш пароль для входа:',
  SURNAME: 'Фамилия:',
  NAME: 'Имя:',
  PATRONYMIC: 'Отчество:',
  LOGIN_OR_MAIL: 'Логин или почта',
  PASS: 'Пароль',
  GENERATE_PASS: 'Сгенерировать пароль:',
  GENERATE_LETTER: 'Сгенерировать письмо для сотрудника',
};
