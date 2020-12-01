require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport')
const session = require('express-session');
const bodyparser = require('body-parser');
const flash = require('connect-flash');

mongoose.connect(process.env.DB_STRING, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('open', () => console.log('Connected to mongoDB'));

const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const indexRouter = require('./routes/index');

const app = express();
app.listen(3000 || process.env.PORT, () => console.log('Server running'))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(flash());
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use(session({secret:'cat_warrior', saveUninitialized: true, resave: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));


// view locals middleware
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
})

// routes middleware
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
