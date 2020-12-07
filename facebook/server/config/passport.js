const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const User = require('../models/users');

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:3000/"
  }, 
  (accessToken, refreshToken, profile, cb) => {
    User.findOne({ facebookID: profile.id}, (err, user) => {
      return cb(err, user);
    })

    User.create({ facebookID: profile.id}, (err, user) => {
      return cb(err, user);
    })
  })
)