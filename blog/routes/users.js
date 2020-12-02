const express = require('express');
const router = express.Router();


const userController = require('../controllers/users');

// POST - LOG IN
router.post('/login', userController.login_user);

// POST - SIGN UP
router.post('/sign-up', userController.sign_up_user);

module.exports = router;