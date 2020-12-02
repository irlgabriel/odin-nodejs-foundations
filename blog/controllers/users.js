const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../models/users');

exports.login_user = (req, res, next) => {
  passport.authenticate('local', {session: false}, (err, user, info) => { 
    if(err || !user) {
      return res.status(400).json({
        message: 'Could not authenticate',
        user
      })
    }
    req.login(user, {session: false}, (err) => {
      if(err) res.send(err);
      jwt.sign(user, process.env.JWT_SECRET, (err, token) => {
        if(err) return res.json(err);
        res.json({user, token});
      });
    })
  })(req, res);
}

exports.sign_up_user = (req, res, next) => {
  const {email, password} = req.body;
  User.findOne({email: email}, (err, user) => {
    if(err) console.log(err);
    if(user) return res.json(new Error('User with this email already exists'));

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if(err) console.log(err);
      User.create({email: email, password: hashedPassword}, (err, user) => {
        if(err) console.log(err);

        jwt.sign(user, process.env.JWT_SECRET, {expiresIn: '3600'}, (err, token) => {
          if(err) console.log(err);
          res.status(200).json({
            token, 
            message:'Signed up Successfully', 
            user: {id: user._id, email: user.email}
          });
        });
      })
    })
  })
}