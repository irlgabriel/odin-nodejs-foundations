const express = require('express');
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
  scope: ['public_profile', 'email']}
));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/'}
))

/* Logout */
router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
})

module.exports = router;
