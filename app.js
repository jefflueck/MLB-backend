'use strict';

/** Express app for MLB */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { NotFoundError } = require('./expressError');

const { authenticateJWT } = require('./middleware/auth');
const authRoutes = require('./routes/auth');
const teamsRoutes = require('./routes/teams');
const usersRoutes = require('./routes/users');

const morgan = require('morgan');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(authenticateJWT);

app.use('/auth', authRoutes);
app.use('/teams', teamsRoutes);
app.use('/users', usersRoutes);

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== 'test') console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
