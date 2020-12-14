const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const multer = require('multer');
const AWS = require('aws-sdk');

const User = require('../models/users');
const Notification = require('../models/notifications');
const FriendRequest = require('../models/friend_request');

// AWS
const S3 = new AWS.S3();

const storage = multer.memoryStorage({
  destination: (req, file, callback) => {
    callback(null, '')
  }
})

const upload = multer({storage: storage, }).single('image');

exports.login = [
  passport.authenticate('local', {session: false}),
  (req, res, next) => {
    next();
  }
]

exports.register = [
  body('email').isEmail().withMessage('Invalid Email').trim().isLength({min: 1}).escape(),
  body('first_name').trim().isLength({min: 1}).escape(),
  body('last_name').trim().isLength({min: 1}).escape(),
  (req, res, next) => {

    const errors = validationResult(req);
    
    if(!errors.isEmpty()) return res.status(400).json(errors.array());

    const {email, first_name, last_name, password} = req.body;

    User.findOne({email: email})
      .populate('friends').exec((err, user) => {
      if(err) return res.status(400).json(err);
      if(user) return res.status(400).json({msg: 'Email already in use'});
      
      bcrypt.hash(password, 10, (err, hash) => {
        if(err) return res.status(400).json(err);
        User.create({email, first_name, last_name, password: hash}, (err, registeredUser) => {
          if(err) return res.status(400).json(err);
          jwt.sign({user: user}, process.env.JWT_SECRET, (err, token) => {
            if(err) return res.status(400).json(err);
            req.user = registeredUser;
            req.token = token;
            next();
          })
        })
      })
    })
  }
]

exports.update_profile_photo = [
  upload,
  (req, res, next) => {
    console.log(req.file);
    const original_file = req.file.originalname.split('.');
    const format = original_file[original_file.length - 1];

    User.findById(req.params.user_id, (err, user) => {
      if(err) return res.status(400).json(err);

      const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: `${user._id}_profile.${format}`,
        Body: req.file.buffer
      }

      //Delete previous instance from s3
      S3.deleteObject({Bucket: params.Bucket, Key: params.Key}, (err, data) => {
        if(err) return res.status(500).json(err);
        console.log(data);
      })

      S3.upload(params, (err, data) => {
        if(err) return res.status(500).json(err);
        User.findOneAndUpdate({_id: req.params.user_id}, {profile_photo: data.Location}, {new: true}, (err, updatedUser) => {
          if(err) return res.status(400).json(err);
          return res.json(updatedUser);
        })
      })
    })

  }
]

exports.update_cover_photo = [
  upload,
  (req, res, next) => {
    const original_file = req.file.originalname.split('.');
    const format = original_file[original_file.length - 1];

    User.findById(req.params.user_id, (err, user) => {
      if(err) return res.status(400).json(err);

      const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: `${user._id}_cover.${format}`,
        Body: req.file.buffer
      }

      //Delete previous instance from s3
      S3.deleteObject({Bucket: params.Bucket, Key: params.Key}, (err, data) => {
        if(err) return res.status(500).json(err);
        console.log(data);
      })

      S3.upload(params, (err, data) => {
        if(err) return res.status(500).json(err);
        User.findOneAndUpdate({_id: req.params.user_id}, {cover_photo: data.Location}, {new: true}, (err, updatedUser) => {
          if(err) return res.status(400).json(err);
          return res.json(updatedUser);
        })
      })
    })
  }
]

exports.get_users = (req, res, next) => {
  User.find((err, users) => {
    if(err) return res.status(400).json(err);
    res.json(users)
  })
}

exports.get_notification = (req, res, next) => {
  Notification.find({to: req.params.user_id})
    .sort('-createdAt')
    .exec((err, notifications) => {
    if(err) return res.status(400).json(err);
    res.json(notifications);
  })
}

exports.delete_notification = (req, res, next) => {
  Notification.findOneAndDelete({_id: req.params.notification_id}, (err, notification) => {
    if(err) return res.status(400).json(err);
    res.json(notification);
  })
}

exports.read_notification = (req, res, next) => {
  Notification.findOneAndUpdate({_id: req.params.notification_id}, {clicked: true}, (err, notification) => {
    if(err) return res.status(400).json(err);
    res.json(notification);
  })
}

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
  FriendRequest.create({from: req.user._id, to: req.params.user_id}, (err, request) => {
    if(err) return res.status(400).json(err);
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