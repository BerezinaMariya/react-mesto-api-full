const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const BadRequestError = require('../middlewares/errors/bad-request-error');
const UnauthorizedError = require('../middlewares/errors/unauthorized-error');

const {
  URL_REGEX,
  DEFAULT_NAME,
  DEFAULT_ABOUT,
  DEFAULT_AVATAR,
  VALIDATION_MESSAGE,
  BAD_EMAIL_OR_PASSWORD_MESSAGE,
} = require('../config/config');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: DEFAULT_NAME,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: DEFAULT_ABOUT,
  },
  avatar: {
    type: String,
    default: DEFAULT_AVATAR,
    validate: {
      validator(value) {
        return URL_REGEX.test(value);
      },
      message: VALIDATION_MESSAGE,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: VALIDATION_MESSAGE,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, {
  versionKey: false,
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(BAD_EMAIL_OR_PASSWORD_MESSAGE));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new BadRequestError(BAD_EMAIL_OR_PASSWORD_MESSAGE));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
