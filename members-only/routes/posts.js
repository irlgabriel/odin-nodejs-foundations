const express = require('express');
const router = express.Router();

const postController = require('../controllers/posts');

// POST create post
router.post('/new', postController.create_post);

// POST edit post
router.post('/:id/edit', postController.edit_post);

module.exports = router;