const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');

const User = require('../models/users');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
} ,(email, password, done) => {
  User.findOne({email}, (err, user) => {
    if(err) return done(err);
    if(!user) return done(null, false, { message: "Email does not exist"});

    //verify password
    bcrypt.compare(password, user.password, (err, match) => {
      if(err) return done(err);
      if(!match) return done(null, false, {message: 'Incorrect Password'});
      return done(null, user, {message: 'Logged In successfully'});
    })
  })
}))

passport.use(new JWTStrategy({
    jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  }, (jwtPayload, done) => {
    return done(null, jwtPayload);
  }
))

module.exports = passport;