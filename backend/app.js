require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/routes');
const { CORS_OPTIONS } = require('./config/config');
const { handleErrors } = require('./helpers/errors-handler');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();
app.use(helmet());

app.use('*', cors(CORS_OPTIONS));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(requestLogger);
app.use('/', routes);
app.use(errorLogger);

app.use(errors());
app.use(handleErrors);

app.listen(PORT);
