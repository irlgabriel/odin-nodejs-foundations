const express = require('express');
const router = express.Router();

const passport = require('passport');


const friendsController = require('../controllers/friend_requests');

/** Friend Requests */

// GET
router.get('/', passport.authenticate('jwt'), friendsController.get_friends_requests);

/* GET Friends Recommendations */
router.get('/friend_recommendations', passport.authenticate('jwt'), friendsController.get_friends_recommendations)

// POST Send
router.post('/send/:user_id', passport.authenticate('jwt'), friendsController.send_friend_request);

// POST Accept
router.post('/accept/:request_id', passport.authenticate('jwt'), friendsController.accept_friend_request);

// POST Decline
router.post('/decline/:request_id', passport.authenticate('jwt'), friendsController.reject_friend_request)


module.exports = router;