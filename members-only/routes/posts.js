const express = require('express');
const router = express.Router();

const postController = require('../controllers/posts');

// POST create post
router.post('/new', postController.create_post);

// GET edit post form
router.get('/:id/edit', postController.get_edit_post)

// POST edit post
router.post('/:id/edit', postController.edit_post);

router.get('/:id/delete', postController.delete_post);
module.exports = router;