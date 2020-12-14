
const User = require('../models/users');
const FriendRequest = require('../models/friend_request');
const Notification = require('../models/notifications');

exports.get_friends_recommendations = (req, res, next) => {
  User.find({friends: {$nin: req.user._id}, _id: {$ne: req.user._id}}, (err, recommendations) => {
    if(err) return res.status(400).json(err);
    res.json(recommendations);
  })
}

exports.get_friends_requests = (req, res, next) => {

  FriendRequest.find({to: req.user._id})
  .populate('to')
  .populate('from')
  .exec((err, requests) => {
    if(err) return res.status(400).json(err);
    res.json(requests);
  })
}

exports.send_friend_request = (req, res, next) => {
  FriendRequest.create({from: req.user._id, to: req.params.user_id}, async(err, request) => {
    if(err) return res.status(400).json(err);
    await Notification.create({from: req.user._id, to: req.params.user_id, type:'friend_request', url: `/users/${req.user._id}`});
    request
    .populate('from')
    .populate('to')
    .execPopulate()
    .then(req => res.json(req))
  })
}

exports.accept_friend_request = (req, res, next) => {
  FriendRequest.findOne({_id: req.params.request_id}, (err, request) => {
    if(err) return res.status(400).json(err);

    // add this friend to each of the requests' users
    User.findOneAndUpdate({_id: request.from}, {$push: {friends: request.to}}, (err, doc) => {
      User.findOneAndUpdate({_id: request.to}, {$push: {friends: request.from}})
    })
    request.remove((err, doc) => {
      if(err) return res.status(400).json(err);
      res.json(doc);
    })
  })
}

exports.reject_friend_request = (req, res, next) => {
  FriendRequest.findOneAndDelete({_id: req.params.request_id}, (err, request) => {
    if(err) return res.status(400).json(err);
    res.json(request);
  })
}