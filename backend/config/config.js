const SALT_ROUND = 10;
const SECRET_KEY = 'some-secret-key';
const URL_REGEX = /^(http|https):\/\/[w{3}.]?[\w-._~:/?#[\]@!$&'()*+,;=]#?/;
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
const OK = 200;
const CREATED = 201;

const CORS_OPTIONS = {
  origin: [
    'http://localhost:3000',
    'http://mesto.berezina.nomoredomains.club',
    'https://mesto.berezina.nomoredomains.club',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

module.exports = {
  SALT_ROUND,
  SECRET_KEY,
  URL_REGEX,
  DEFAULT_ALLOWED_METHODS,
  OK,
  CREATED,
  CORS_OPTIONS,
};
