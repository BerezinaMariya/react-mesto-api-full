const { celebrate, Joi } = require('celebrate');

const { URL_REGEX } = require('../../config/config');
const { isIdValid } = require('../../helpers/isIdValid');

const nameAndAboutValidationRequirements = Joi.string().min(2).max(30);
const avatarValidationRequirements = Joi.string().regex(URL_REGEX);
const emailValidationRequirements = Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ru'] } });
const passwordValidationRequirements = Joi.string().required();

module.exports.validateUserRegData = celebrate({
  body: Joi.object().keys({
    name: nameAndAboutValidationRequirements,
    about: nameAndAboutValidationRequirements,
    avatar: avatarValidationRequirements,
    email: emailValidationRequirements,
    password: passwordValidationRequirements,
  }),
});

module.exports.validateUserAuthData = celebrate({
  body: Joi.object().keys({
    email: emailValidationRequirements,
    password: passwordValidationRequirements,
  }),
});

module.exports.validateUserId = celebrate({
  params: Joi.object().keys({
    userId: isIdValid,
  }),
});

module.exports.validateUserInfo = celebrate({
  body: Joi.object().keys({
    name: nameAndAboutValidationRequirements,
    about: nameAndAboutValidationRequirements,
  }),
});

module.exports.validateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: avatarValidationRequirements,
  }),
});
