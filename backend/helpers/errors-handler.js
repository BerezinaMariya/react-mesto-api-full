const {
  INTERNAL_SERVER_ERROR_500,
  INTERNAL_SERVER_ERROR_MESSAGE,
} = require('../config/config');

module.exports.handleErrors = (err, req, res, next) => {
  const { statusCode = INTERNAL_SERVER_ERROR_500, message } = err;

  res.status(statusCode).send({
    message: statusCode === INTERNAL_SERVER_ERROR_500
      ? INTERNAL_SERVER_ERROR_MESSAGE
      : message,
  });

  next();
};
