const express = require('express');
const router = express.Router();

const memberController = require('../controllers/members');

// GET index page
router.get('/', memberController.index)

// POST become member
router.post('/:id/membership', memberController.membership)

module.exports = router;