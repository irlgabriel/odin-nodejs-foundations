const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../models/users');

exports.get_users = (req, res, next) => {
  User.find((err, users) => {
    if(err) return res.json(err);
    res.json(users);
  })
}

exports.login_user = (req, res, next) => {
  passport.authenticate('local', {session: false}, (err, user, info) => { 
    if(err || !user) {
      return res.status(400).json({
        message: 'Could not authenticate',
        user
      })
    }
    if(err) res.send(err);
    jwt.sign({_id: user._id, email: user.email}, process.env.JWT_SECRET, {expiresIn: 3600} , (err, token) => {
      if(err) return res.status(400).json(err);
      res.json({token: token, user: {_id: user._id, email: user.email}});
    });
  })(req, res);
}

exports.sign_up_user = (req, res, next) => {
  const {email, password} = req.body;
  User.findOne({email: email}, (err, user) => {
    if(user) return res.json({message:'User with this email already exists'});

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if(err) console.log(err);
      User.create({email: email, password: hashedPassword}, (err, user) => {
        if(err) console.log(err);
        console.log(user);
        jwt.sign({_id: user._id, email: user.email}, process.env.JWT_SECRET, {expiresIn: '3600'}, (err, token) => {
          if(err) console.log(err);
          res.status(200).json({
            token,
            user: {_id: user._id, email: user.email}, 
            message:'Signed up Successfully', 
          });
        });
      })
    })
  })
}

exports.get_user = (req, res, user) => {
  User.findOne({_id: req.params.user_id}, (err, user) => {
    if(err) return res.json(err);
    res.json(user);
  })
}