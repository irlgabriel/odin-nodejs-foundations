const express = require('express');
const router = express.Router();
const passport = require('passport');

const postController = require('../controllers/posts');

// GET all posts
router.get('/', postController.get_posts)

// POST create post
router.post('/', [
  passport.authenticate('jwt', {session: false}), 
  postController.create_post
])
module.exports = router;