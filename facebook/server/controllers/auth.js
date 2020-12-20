const passport = require("passport");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/users");

exports.login = [
  passport.authenticate("local", { session: false }),
];

exports.checkAuth = (req, res, next) => {
  if(req.user) {
    res.json({user_id: req.user_id});
  } else {
    res.sendStatus(403);
  }
}

exports.facebook_callback = (req, res, next) => {
  passport.authenticate('facebook', (err, user, info) => {
    if(err) return next(err);
    if(!user) return res.redirect(process.env.FRONTEND_URL)
    req.logIn(user, (err) => {
      if(err) return next(err);
      jwt.sign(user.toJSON(), process.env.JWT_SECRET, (err, token) => {
        if(err) next(err);
        return res.json({user, token});
      })
    })
  })(req, res, next);
}

exports.register = [
  body("email")
    .isEmail()
    .withMessage("Invalid Email")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("first_name").trim().isLength({ min: 1 }).escape(),
  body("last_name").trim().isLength({ min: 1 }).escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.status(400).json(errors.array());

    const { email, first_name, last_name, password } = req.body;

    User.findOne({ email: email })
      .populate("friends")
      .exec((err, user) => {
        if (err) return res.status(400).json(err);
        if (user) return res.status(400).json({ msg: "Email already in use" });

        bcrypt.hash(password, 10, (err, hash) => {
          if (err) return res.status(400).json(err);
          User.create(
            { email, first_name, last_name, password: hash },
            (err, registeredUser) => {
              if (err) return res.status(400).json(err);
              req.logIn(registeredUser, err => {
                if (err) return res.status(400).json(err);
                jwt.sign({ user: registeredUser }, process.env.JWT_SECRET, (err, token) => {
                  if (err) return res.status(400).json(err);
                })
              });
            }
          );
        });
      });
  },
];
