require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const passport = require('passport');
require('./config/passport');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose')

const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comment');

mongoose.connect(process.env.DB_STRING, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});
mongoose.connection.on('open', () => console.log('Connected to mongoDB'));

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'public')));

// routes path
app.use('/', usersRouter);
app.use('/posts', postsRouter);
app.use('/posts/:post_id/comments', commentsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err);
  res.json(err);
});

module.exports = app;
