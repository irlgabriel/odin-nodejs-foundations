const express = require('express');
const router = express.Router();

const passport = require('passport');

const notificationsController = require('../controllers/notifications')

/** Notifications */
// GET
router.get('/', notificationsController.get_notification);

// PUT - read notification
router.put('/:notification_id', notificationsController.read_notification);

// DELETE - delete notification
router.delete('/:notification_id', notificationsController.delete_notification);

module.exports = router;