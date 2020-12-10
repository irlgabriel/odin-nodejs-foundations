const express = require('express');
const router = express.Router();
const passport = require('passport');

const postController = require('../controllers/posts');

// GET retrieve post
router.get('/', postController.get_posts);

// POST create post
router.post('/', passport.authenticate('jwt'), postController.create_post);

// PUT edit post
router.put('/:post_id', passport.authenticate('jwt'), postController.edit_post);

router.post('/:post_id/like', passport.authenticate('jwt'), postController.like_post)

// DELETE delete post
router.delete('/:post_id', passport.authenticate('jwt'), postController.delete_post);

module.exports = router;