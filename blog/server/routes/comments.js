const express = require('express');
const router = express.Router({mergeParams: true});
const passport = require('passport');

const commentsController = require('../controllers/comments');

// GET get posts comments
router.get('/', commentsController.get_post_comments);

// POST create new comment
router.post('/', [
  passport.authenticate('jwt', {session: false}),
  commentsController.create_comment
]);

// PUT edit comment
router.put('/:comment_id', 
  passport.authenticate('jwt', {session: false}),
  commentsController.edit_comment
);

// DELETE comment
router.delete('/comment_id', 
  passport.authenticate('jwt', {session: false}),
  commentsController.delete_comment
);

module.exports = router;