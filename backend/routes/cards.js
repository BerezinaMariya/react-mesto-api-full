const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const { isIdValid } = require('../helpers/isIdValid');
const { URL_REGEX } = require('../config/config');

router.get('/', getCards);

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().regex(URL_REGEX),
    }).unknown(true),
  }),
  createCard,
);

router.delete(
  '/:cardId',
  celebrate({
    params: Joi.object({
      cardId: isIdValid,
    }).unknown(true),
  }),
  deleteCard,
);

router.put(
  '/:cardId/likes',
  celebrate({
    params: Joi.object({
      cardId: isIdValid,
    }).unknown(true),
  }),
  likeCard,
);

router.delete(
  '/:cardId/likes',
  celebrate({
    params: Joi.object({
      cardId: isIdValid,
    }).unknown(true),
  }),
  dislikeCard,
);

module.exports = router;
