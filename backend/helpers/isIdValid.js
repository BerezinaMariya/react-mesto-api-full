const mongoose = require('mongoose');
const { Joi } = require('celebrate');

const validateId = (value, helpers) => {
  if (!mongoose.isObjectIdOrHexString(value)) {
    return helpers.error('any.invalid');
  }

  return value;
};

const isIdValid = Joi.string().required().custom(validateId, 'custom validation');

module.exports = { isIdValid };
