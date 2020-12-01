const User = require('../models/users');
const passport = require('../config/passport'); 
const { body, validationResult } = require('express-validator');
const async = require('async');
const bcrypt = require('bcrypt');

exports.get_users = function(req, res) {
  User.find((err, users) => {
    if(err) return res.json(err);
    res.json(users);
  })
}

exports.profile_get = function(req, res) {
  if(req.user) {
    res.render('profile', {title: req.user.fullname, user: req.user})
  } else {
    res.redirect('/');
  }
}

exports.sign_up_get = function(req, res) {
  res.render('sign-up', {title: 'Sign up'})
}

exports.sign_up_post = [
  body('first_name').trim().isLength({min: 1}).escape(),
  body('last_name').trim().isLength({min: 1}).escape(),
  body('email').trim().isLength({min: 6}).escape().isEmail().withMessage('Invalid Email!'),
  body('password').trim().isLength({min: 6}).escape(),
  body('username').trim().isLength({min: 1}).escape(),
  function(req, res) {
    const newUser = {...req.body};
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.render('sign-up', {title: 'Sign up', errors: errors.array(), user: newUser})
    }
    // Check if email and username are available
    async.parallel([
      function(callback) {
        User.findOne({username: newUser.username}, callback) 
      },
      function(callback) {
        User.findOne({email: newUser.email}, callback)
      }
    ], function(err, results) {
        if(err) return res.json(err);
        // if username not available
        if(results[0]) return res.render('sign-up', {title: 'Sign up', errors: [{msg: 'Username already in use'}], user: newUser})
        // if email not avalable
        if(results[1]) return res.render('sign-up', {title: 'Sign up', errors: [{msg: 'Email already in use'}], user: newUser})

        // hash password
        bcrypt.hash(newUser.password, 10, (err, pass) => {
          if(err) return res.json(err);
          newUser.password = pass;
          // now just create the user
          User.create(newUser, (err, user) => {
            if(err) return res.json(err);
            res.redirect('/users/profile');
         })
        })
    })
  }
]
exports.login_get = function(req, res) {
  res.render('login', {title: 'Login'})
}

exports.login_post = function(req, res, next) {
  passport.authenticate('local', {failureFlash: true, successFlash: true}, function(err, user, info) {
    if(err) console.log(err);
    if(!user) return res.redirect('/users/login');
    req.logIn(user, function(err) {
      if(err) console.log(err);
      return res.redirect('/users/profile');
    })
  })(req, res, next);
}
  
