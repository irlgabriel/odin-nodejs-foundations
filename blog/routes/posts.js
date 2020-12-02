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

// PUT update post
router.put('/:post_id', postController.edit_post);
module.exports = router;

// DELETE delete post
router.delete('/:post_id', postController.delete_post);