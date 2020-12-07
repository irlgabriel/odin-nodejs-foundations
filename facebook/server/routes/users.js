const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const passport = require('passport')
const tokenMiddleware = require('../middlewares/token');

const userController = require('../controllers/user');

/* Login */
router.post('/login', userController.login, tokenMiddleware);

/* Register */
router.post('/register', userController.register, tokenMiddleware);

/* Facebook auth */
router.get('/auth/facebook', passport.authenticate('facebook', {
  session: false,
  scope: ['public_profile', 'email']}
));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  session: false,
  successRedirect: '/',
  failureRedirect: '/'}
))

/* Logout */
router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
})

module.exports = router;
