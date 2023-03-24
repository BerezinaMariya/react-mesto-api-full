const http2 = require('node:http2');

const OK_200 = http2.constants.HTTP_STATUS_OK;
const CREATED_201 = http2.constants.HTTP_STATUS_CREATED;
const NO_CONTENT_204 = http2.constants.HTTP_STATUS_NO_CONTENT;
const BAD_REQUEST_400 = http2.constants.HTTP_STATUS_BAD_REQUEST;
const UNAUTHORIZED_401 = http2.constants.HTTP_STATUS_UNAUTHORIZED;
const FORBIDDEN_403 = http2.constants.HTTP_STATUS_FORBIDDEN;
const NOT_FOUND_404 = http2.constants.HTTP_STATUS_NOT_FOUND;
const CONFLICT_409 = http2.constants.HTTP_STATUS_CONFLICT;
const INTERNAL_SERVER_ERROR_500 = http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;

const SALT_ROUND = 10;
const SECRET_KEY = 'some-secret-key';

const URL_REGEX = /^(http|https):\/\/[w{3}.]?[\w-._~:/?#[\]@!$&'()*+,;=]#?/i;

const CORS_OPTIONS = {
  origin: [
    'http://localhost:3000',
    'http://mesto.berezina.nomoredomains.club',
    'https://mesto.berezina.nomoredomains.club',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: NO_CONTENT_204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

const MONGO_BASE = 'mongodb://127.0.0.1:27017/mestodb';

const DEFAULT_NAME = 'Жак-Ив Кусто';
const DEFAULT_ABOUT = 'Исследователь';
const DEFAULT_AVATAR = 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png';

// messages
const PAGE_NOT_FOUND_MESSAGE = 'Страница по указанному маршруту не найдена';
const NOT_FOUND_ERROR_MESSAGE = 'Запрашиваемые данные не найдены';
const CONFLICT_ERROR_MESSAGE = 'Пользователь с таким email уже существует';
const BAD_REQUEST_ERROR_MESSAGE = 'Передан невалидный id';
const FORBIDDEN_ERROR_MESSAGE = 'Можно удалять только свои карточки';
const INTERNAL_SERVER_ERROR_MESSAGE = 'На сервере произошла ошибка';
const CARD_DELETE_MESSAGE = 'Пост удален';
const UNAUTHORIZED_ERROR_MESSAGE = 'Необходима авторизация';
const EXIT_MESSAGE = 'Вы покинули сайт';
const VALIDATION_MESSAGE = 'Переданы невалидные данные';
const BAD_EMAIL_OR_PASSWORD_MESSAGE = 'Неправильные почта или пароль';

module.exports = {
  OK_200,
  CREATED_201,
  BAD_REQUEST_400,
  UNAUTHORIZED_401,
  FORBIDDEN_403,
  NOT_FOUND_404,
  CONFLICT_409,
  INTERNAL_SERVER_ERROR_500,
  SALT_ROUND,
  SECRET_KEY,
  URL_REGEX,
  CORS_OPTIONS,
  MONGO_BASE,
  DEFAULT_NAME,
  DEFAULT_ABOUT,
  DEFAULT_AVATAR,
  PAGE_NOT_FOUND_MESSAGE,
  NOT_FOUND_ERROR_MESSAGE,
  CONFLICT_ERROR_MESSAGE,
  BAD_REQUEST_ERROR_MESSAGE,
  FORBIDDEN_ERROR_MESSAGE,
  INTERNAL_SERVER_ERROR_MESSAGE,
  CARD_DELETE_MESSAGE,
  UNAUTHORIZED_ERROR_MESSAGE,
  EXIT_MESSAGE,
  VALIDATION_MESSAGE,
  BAD_EMAIL_OR_PASSWORD_MESSAGE,
};
