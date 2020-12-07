const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/users');
const { body, validationResult } = require('express-validator');

exports.login = [
  passport.authenticate('local'),
  (req, res, next) => {
    res.redirect('/');
  }
]

exports.register = (req, res, next) => [
  body('email').isEmail().withMessage('Invalid Email').trim().isLength({min: 1}).escape(),
  body('first_name').trim().isLength({min: 1}).escape(),
  body('last_name').trim().isLength({min: 1}).escape(),
  (req, res, next) => {

    const errors = validationResult(req);
    
    if(!errors.isEmpty()) return res.status(400).json(errors.array());

    const {email, first_name, last_name, password} = req.body;

    User.findOne({email: email}, (err, user) => {
      if(err) return res.status(400).json(err);
      if(user) return res.status(400).json({msg: 'Email already in use'});
      
      bcrypt.hash(password, 10, (err, hash) => {
        User.create({email, first_name, last_name, password: hash}, (err, registeredUser) => {
          if(err) return res.status(400).json(err);
          res.json(registeredUser);
        })
      })
    })
  }
]