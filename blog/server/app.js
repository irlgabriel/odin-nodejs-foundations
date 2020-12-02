require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
require('./config/passport');

const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');

const app = express();

mongoose.connect(process.env.DB_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connection.on('open', () => console.log('Connected to mongoDB'));

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.listen(process.env.PORT || 5000, () => console.log('Server running'));

app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);
app.use('/api/posts/:post_id/comments', commentsRouter);