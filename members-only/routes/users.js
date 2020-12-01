const express = require('express');
const router = express.Router();

const userController = require('../controllers/users');

// GET all users
router.get('/', userController.get_users);

// GET profile page
router.get('/profile', userController.profile_get);

// GET sign-up page
router.get('/sign-up', userController.sign_up_get);

// POST sign-up
router.post('/sign-up', userController.sign_up_post);

// GET login page
router.get('/login', userController.login_get);

// POST login
router.post('/login', userController.login_post);

// POST logout
router.get('/logout', userController.logout_get);
module.exports = router;