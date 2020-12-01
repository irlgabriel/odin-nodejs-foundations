const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/users');

passport.use(new LocalStrategy(
  (username, password, done) => {
    User.findOne({username: username}, (err, user) => {
      if(err) return done(err);
      if(!user) return done(null, false, { message: 'Incorrect username'});

      // check password
      bcrypt.compare(password, user.password, (err, match) => {
        if(err) return done(err);
        if(!match) return done(null, false, { message: 'Incorrect password'});
        return done(null, user);
      })
    })
  }
))

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


module.exports = passport;