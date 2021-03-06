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

// POST publish post
router.post('/:post_id/publish', [
  passport.authenticate('jwt', {session: false}),
  postController.publish_post
]);

// POST unpublish post
router.post('/:post_id/unpublish', [  
  passport.authenticate('jwt', {session: false}), 
  postController.unpublish_post
]);

// PUT update post
router.put('/:post_id', [
  passport.authenticate('jwt', {session: false}),
  postController.edit_post
]);

// DELETE delete post
router.delete('/:post_id', [
  passport.authenticate('jwt', {session: false}),
  postController.delete_post
]);

module.exports = router;
