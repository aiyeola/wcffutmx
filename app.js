/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
require('dotenv').config();
require('./database');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');
const errorHandler = require('errorhandler');
const logger = require('./utils/logger');

const isProduction = process.env.NODE === 'production';

app.enable('trust proxy');
app.use(morgan('dev'));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

if (!isProduction) {
  app.use(errorHandler());
}

app.use(routes);

// Server static assets if in production
if (isProduction) {
  // Set static folder
  app.use(favicon(__dirname + 'client/build/favicon.ico'));
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

if (!isProduction) {
  app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
        error: err
      }
    });
  });
}

// production error handler
// no stack traces leaked to user
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {}
    }
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started, listening on ${PORT}`);
});
