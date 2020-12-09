const express = require('express');
const router = express.Router({mergeParams: true});

const commentController = require('../controllers/comments');

// GET comments
router.get('s', commentController.get_comments);

// POST create comment
router.post('/', commentController.create_comment);

// PUT edit comment
router.put('/:comment_id', commentController.edit_comment);

// DELETE delete comment
router.delete('/:comment_id', commentController.delete_comment);

module.exports = router;