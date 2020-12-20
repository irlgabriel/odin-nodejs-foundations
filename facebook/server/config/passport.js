const passport = require("passport");
const bcrypt = require("bcrypt");
const JWTStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

const ExtractJWT = require("passport-jwt").ExtractJwt;

const User = require("../models/users");

passport.use(
  new JWTStrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    (user, done) => {
      //console.log('user in passport jwt strategy mw: ', user);
      if (!user) return done(null, false);
      return done(null, user);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:5000/auth/facebook/callback",
      //passReqToCallback: true,
      profileFields: ['displayName', 'photos', 'email']
    },
    (accessToken, refreshToken, profile, cb) => {
      User.findOne({ _id: profile.id })
        .populate("friends")
        .exec((err, user) => {
          if (user) {
            return cb(err, user);
          } else {
            User.create(
              {
                username: profile.emails[0].value,
                profile_photo: profile.photos[0].value,
                facebookID: profile.id,
                display_name: profile.displayName,
              },
              (err, user) => {
                return cb(err, user);
              }
            );
          }
        });
    }
  )
);

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (email, password, done) => {
      User.findOne({ email: email })
        .populate("friends")
        .exec((err, user) => {
          if (err) return done(err);
          if (!user) return done(null, false);
          //check for password match
          bcrypt.compare(password, user.password, (err, match) => {
            if (err) return done(err, false);
            if (!match) return done(null, false);
            return done(null, user);
          });
        });
    }
  )
);

passport.serializeUser(function (user, cb) {
  //console.log('user before serializing: ', user);
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  //console.log('user before deserializing: ', obj);
  cb(null, obj);
});

module.exports = passport;
