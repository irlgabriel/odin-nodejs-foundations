const express = require('express');
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb+srv://gabi:4321@cluster0.yxfyq.mongodb.net/test?retryWrites=true&w=majority', {useUnifiedTopology: true, useNewUrlParser: true})

const User = mongoose.model(
  "User", 
  new Schema({
    username: { type: String, required: true},
    password: { type: String, required: true}
  })
);

// passportjs middleware setup

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) { 
        return done(err);
      };
      if (!user) {
        return done(null, false, { msg: "Incorrect username" });
      }
      bcrypt.compare(password, user.password, (err, match) => {
        if(err) return done(err);
        if(match) return done(null, user)
        else return done(null, false, { msg: "Incorrect password" });
      })
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({secret: 'cats', resave: false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({extended: false}));

// middleware for assigning currentuser all through the views
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.get("/", (req, res) => {
  res.render("index", { user: req.user });
});
app.get("/sign-up", (req, res) => res.render("sign-up-form"));
app.post("/sign-up", (req, res, next) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  })
  bcrypt.hash(user.password, 10, (err, hashedPassword) => {
    if(err) return next(err);
    user.password = hashedPassword;
    user.save(err => {
      if (err) { 
        return next(err);
      };
      res.redirect("/");
    });
  })
  
});
app.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  })
);
app.get("/log-out", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.listen(3000, () => console.log('Server running on port 3000'));