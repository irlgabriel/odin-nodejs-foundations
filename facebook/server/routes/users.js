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

/* GET all users */
router.get('/users', userController.get_users);

/** Photos pictures */
/** Update profile pic */
router.put('/:user_id/profile_photo', userController.update_profile_photo);

/** Update Cover pic */
router.put('/:user_id/cover_photo', userController.update_cover_photo);

/** Notifications */
// GET
router.get('/:user_id/notifications', userController.get_notification);

// PUT - read notification
router.put('/notifications/:notification_id', userController.read_notification);

// DELETE - delete notification
router.delete('/notifications/:notification_id', userController.delete_notification);

/* Logout */
router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
})

module.exports = router;
