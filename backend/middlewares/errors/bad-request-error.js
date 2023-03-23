const {
  BAD_REQUEST_400,
} = require('../../config/config');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST_400;
  }
}

module.exports = BadRequestError;
