const SALT_ROUND = 10;
const SECRET_KEY = 'some-secret-key';
const URL_REGEX = /^(http|https):\/\/[w{3}.]?[\w-._~:/?#[\]@!$&'()*+,;=]#?/;
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = {
  SALT_ROUND,
  SECRET_KEY,
  URL_REGEX,
  DEFAULT_ALLOWED_METHODS,
};
