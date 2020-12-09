const express = require('express');
const router = express.Router();
const passport = require('passport');

const postController = require('../controllers/posts');

// GET retrieve post
router.get('/', postController.get_posts);

// POST create post
router.post('/', passport.authenticate('jwt'), postController.create_post);

// PUT edit post
router.put('/:post_id', postController.edit_post);

// DELETE delete post
router.delete('/:post_id', postController.delete_post);

module.exports = router;