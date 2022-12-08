const jwt = require('jsonwebtoken');

const YOUR_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzkwN2ZkOTc0NDYwOGE5YmM1YzdmNjYiLCJpYXQiOjE2NzA1MTg5NjksImV4cCI6MTY3MTEyMzc2OX0.9YM5c4YoKxG9xqKwwmGAQPLUQy-zOUZahyQCbN7Hayk'; // вставьте сюда JWT, который вернул публичный сервер
const SECRET_KEY_DEV = 'some-secret-key'; // вставьте сюда секретный ключ для разработки из кода

module.exports.testJwt = (next) => {
  try {
    const payload = jwt.verify(YOUR_JWT, SECRET_KEY_DEV);

    console.log('\x1b[31m%s\x1b[0m', `
    Надо исправить. В продакшне используется тот же
    секретный ключ, что и в режиме разработки.
    `);
  } catch (err) {
    if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
      console.log(
        '\x1b[32m%s\x1b[0m',
        'Всё в порядке. Секретные ключи отличаются',
      );
    } else {
      console.log(
        '\x1b[33m%s\x1b[0m',
        'Что-то не так',
        err,
      );
    }
    return next(err);
  }
  return next();
};
