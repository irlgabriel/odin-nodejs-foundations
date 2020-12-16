const express = require('express');
const router = express.Router();

const passport = require('passport');


const friendsController = require('../controllers/friend_requests');

/** Friend Requests */


/* GET Friends Recommendations */
router.get('/recommendations', passport.authenticate('jwt'), friendsController.get_friends_recommendations)

// GET
router.get('/:user_id', passport.authenticate('jwt'), friendsController.get_friends_requests);


// POST Send
router.post('/:user_id/send', passport.authenticate('jwt'), friendsController.send_friend_request);

// POST Accept
router.post('/:request_id/accept', passport.authenticate('jwt'), friendsController.accept_friend_request);

// POST Decline
router.post('/:request_id/decline', passport.authenticate('jwt'), friendsController.reject_friend_request)


module.exports = router;