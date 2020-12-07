const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const User = require('../models/users');



passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:3000/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'photos', 'email']
  }, 
  (accessToken, refreshToken, profile, cb) => {

    console.log(profile);
    User.findOne({ facebookID: profile.id}, (err, user) => {
      if(user) {
        return cb(err, user);
      } else {
        User.create({ email: profile.emails[0].value, profilePhoto: profile.photos[0].value, facebookID: profile.id, displayName: profile.displayName}, (err, user) => {
          return cb(err, user);
        })
      }
    })
  })
)

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

module.exports = passport;