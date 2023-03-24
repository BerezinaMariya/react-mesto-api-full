const { celebrate, Joi } = require('celebrate');

const { isIdValid } = require('../../helpers/isIdValid');
const { URL_REGEX } = require('../../config/config');

const nameValidationRequirements = Joi.string().required().min(2).max(30);
const linkValidationRequirements = Joi.string().required().regex(URL_REGEX);

module.exports.validateCardData = celebrate({
  body: Joi.object().keys({
    name: nameValidationRequirements,
    link: linkValidationRequirements,
  }),
});

module.exports.validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: isIdValid,
  }),
});
