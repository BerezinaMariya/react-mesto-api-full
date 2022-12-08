const Card = require('../models/card');
const { OK, CREATED } = require('../config/config');

const NotFoundError = require('../middlewares/errors/not-found-error');
const BadRequestError = require('../middlewares/errors/bad-request-error');
const ForbiddenError = require('../middlewares/errors/forbidden-error');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(OK).send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(CREATED).send(card))
    .catch((err) => next(err));
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError('Запрашиваемая карточка не найдена');
    })
    .then((card) => {
      if (req.user._id !== card.owner._id.toString()) {
        throw new ForbiddenError('Можно удалять только свои карточки');
      } else {
        return card.remove();
      }
    })
    .then(() => res.status(OK).send({ message: 'Пост удален' }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан невалидный id карточки'));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Запрашиваемая карточка не найдена');
    })
    .then((card) => res.status(OK).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан невалидный id карточки'));
      } else {
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Запрашиваемая карточка не найдена');
    })
    .then((card) => res.status(OK).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан невалидный id карточки'));
      } else {
        next(err);
      }
    });
};
