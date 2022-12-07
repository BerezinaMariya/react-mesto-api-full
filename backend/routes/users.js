const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getСurrentUser,
  getUserId,
  updateUserInfo,
  updateUserAvatar,
  exit,
} = require('../controllers/users');
const { isIdValid } = require('../helpers/isIdValid');
const { URL_REGEX } = require('../config/config');

router.get('/', getUsers);

router.get('/me', getСurrentUser);

router.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: isIdValid,
    }).unknown(true),
  }),
  getUserId,
);

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }).unknown(true),
  }),
  updateUserInfo,
);

router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().regex(URL_REGEX),
    }).unknown(true),
  }),
  updateUserAvatar,
);

router.post('/signout', exit);

module.exports = router;
