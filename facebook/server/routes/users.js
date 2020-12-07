const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const passport = require('passport')

const userController = require('../controllers/user');

router.get('/', (req, res, next) => {
  res.json(req.user);
})

/* Login */
router.post('/login', userController.login);

/* Register */
router.post('/register', userController.register);

/* Facebook auth */
router.get('/auth/facebook', passport.authenticate('facebook', {
  session: false,
  scope: ['public_profile', 'email']}
));
router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  session: false,
  successRedirect: '/',
  failureRedirect: '/'}
), (req, res) => {
  const token = req.user.jwt_token;
  res.json({token: token});
})

/* Logout */
router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
})

module.exports = router;
