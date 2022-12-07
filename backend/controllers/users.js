const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { SALT_ROUND, SECRET_KEY } = require('../config/config');

const NotFoundError = require('../middlewares/errors/not-found-error');
const BadRequestError = require('../middlewares/errors/bad-request-error');
const ConflictError = require('../middlewares/errors/conflict-error');

const ok = 200;
const created = 201;

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, SALT_ROUND)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then(() => {
      res.status(created).send({
        name,
        about,
        avatar,
        email,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует'));
      } else {
        next(err);
      }
    });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(ok).send(users))
    .catch(next);
};

module.exports.getСurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(ok).send(user))
    .catch(next);
};

module.exports.getUserId = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new NotFoundError('Запрашиваемый пользователь не найден');
    })
    .then((user) => res.status(ok).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан невалидный id пользователя'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  const { NODE_ENV, JWT_SECRET } = process.env;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : SECRET_KEY,
        { expiresIn: '7d' },
      );

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: false,
      });

      res.status(ok).send({ token });
    })
    .catch(next);
};

module.exports.exit = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('Запрашиваемый пользователь не найден');
    })
    .then(() => {
      res.clearCookie('jwt').send({ message: 'Вы покинули сайт' });
    })
    .catch(next);
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .orFail(() => {
      throw new NotFoundError('Запрашиваемый пользователь не найден');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан невалидный id пользователя'));
      } else {
        next(err);
      }
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .orFail(() => {
      throw new NotFoundError('Запрашиваемый пользователь не найден');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан невалидный id пользователя'));
      } else {
        next(err);
      }
    });
};
