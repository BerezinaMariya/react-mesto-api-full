const router = require('express').Router();

const { validateUserRegData, validateUserAuthData } = require('../middlewares/validators/validateUserData');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../middlewares/errors/not-found-error');

const userRouter = require('./users');
const cardRouter = require('./cards');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

const { testJwt } = require('../test-jwt');

router.get('/jwt-test', testJwt);

router.post('/signup', validateUserRegData, createUser);
router.post('/signin', validateUserAuthData, login);

router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.use(() => {
  throw new NotFoundError('Страница по указанному маршруту не найдена');
});

module.exports = router;
