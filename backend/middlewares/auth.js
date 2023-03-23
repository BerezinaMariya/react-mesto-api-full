const jwt = require('jsonwebtoken');

const UnauthorizedError = require('./errors/unauthorized-error');
const { SECRET_KEY, UNAUTHORIZED_ERROR_MESSAGE } = require('../config/config');

module.exports = (req, res, next) => {
  if (!req.cookies) {
    throw new UnauthorizedError(UNAUTHORIZED_ERROR_MESSAGE);
  }

  const { NODE_ENV, JWT_SECRET } = process.env;

  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : SECRET_KEY);
  } catch (err) {
    return next(new UnauthorizedError(UNAUTHORIZED_ERROR_MESSAGE));
  }

  req.user = payload;

  return next();
};
