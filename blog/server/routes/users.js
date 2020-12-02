const express = require('express');
const router = express.Router();


const userController = require('../controllers/users');

// GET - Get users
router.get('/', userController.get_users);

// POST - LOG IN
router.post('/login', userController.login_user);

// POST - SIGN UP
router.post('/sign-up', userController.sign_up_user);

// GET - GET user by id
router.get('/:user_id', userController.get_user)


module.exports = router;