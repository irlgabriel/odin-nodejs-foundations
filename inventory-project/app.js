require('dotenv').config()
var helmet = require('helmet');
var compression = require('compression');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

mongoose.connect(process.env.DB_STRING, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.once('open', () => console.log("Connected to mongoDB"));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// security middleware
app.use(helmet());

// set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(compression());

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
