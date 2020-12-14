const { body, validationResult } = require('express-validator');

const Comment = require('../models/comments');
const Notification = require('../models/notifications');
const User = require('../models/users');

module.exports.get_comments = (req, res, next) => {
  Comment.find({post: req.params.post_id})
  .populate('post')
  .populate('comment')
  .populate('user')
  .populate('likes')
  .sort('-createdAt')
  .exec((err, comments) => {
    if(err) return res.status(400).json(err);
    res.json(comments);
  })
}

// GET REPLIES
module.exports.get_replies = (req, res, next) => {
  Comment.find({comment: req.params.comment_id})
  .populate('comment')
  .populate('user')
  .populate('user')
  .exec((err, replies) => {
    if(err) return res.status(400).json(err);
    res.json(replies);
  })
}

module.exports.create_comment = [
  body('content').trim().isLength({min: 1}).escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) return res.status(400).json(errors.array());

    const { content, comment } = req.body;
    console.log(req.params);
    Comment.create({content, user: req.user._id, post: req.params.post_id, comment}, (err, comment) => {
      if(err) return res.status(400).json(err);
      comment
      .populate('user')
      .populate('comment')
      .populate('post')
      .execPopulate()
      .then(comm => res.json(comm))
      .catch(err => console.log(err))
    })
}]

module.exports.edit_comment = [
  body('content').trim().isLength({min: 1}).escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) return res.status(400).json(errors.array());

    const { content } = req.body;

    Comment.findOneAndUpdate({_id: req.params.comment_id}, {content}, {new: true})
    .populate('user')
    .populate('post')
    .populate('comment')
    .populate('likes')
    .exec((err, comment) => {
      if(err) return res.status(400).json(err);
      res.json(comment);
    })
  }
]

module.exports.like_comment = (req, res, next) => {
  const user_id = req.user._id
  console.log(req.params);
  Comment.findOne({_id: req.params.comment_id}, (err, comment) => {
    if(err) return res.status(400).json(err)
    if(comment.likes.includes(user_id)) {
      Comment.findOneAndUpdate({_id: req.params.comment_id}, {$pull: {likes: user_id}}, {new: true}, (err, updatedComment) => {
        if(err) return res.status(400).json(err)
        updatedComment
        .populate('user')
        .populate('comment')
        .populate('post')
        .populate('likes')
        .execPopulate()
        .then(populatedComment => res.json(populatedComment))
      })
    } else {
      Comment.findOneAndUpdate({_id: req.params.comment_id}, {$push: {likes: user_id}}, {new: true}, async(err, updatedComment) => {
        if(err) return res.status(400).json(err)
         // Send notification to the post's author;
         const from = await User.findById(user_id);
         const to = await User.findById(updatedComment.user._id);
         if(to._id !== from._id) {
          Notification.create({from, to, type: 'like_comment', url: `/posts/${req.params.post_id}`}, (err, notification) => {
            if(err) return res.status(400).json(err);
            updatedComment
            .populate('user')
            .populate('comment')
            .populate('post')
            .populate('likes')
            .execPopulate()
            .then(populatedComment => res.json(populatedComment))
          })
        } else {
          updatedComment
            .populate('user')
            .populate('comment')
            .populate('post')
            .populate('likes')
            .execPopulate()
            .then(populatedComment => res.json(populatedComment))
        }
      })
    }
  })
}

module.exports.delete_comment = (req, res, next) => {
  Comment.findOneAndRemove({_id: req.params.comment_id}, (err, comment) => {
    if(err) return res.status(400).json(err);
    Comment.deleteMany({comment_id: comment._id}, (err, deletedComments) => {
      if(err) return res.status(400).json(err);
    })
    res.json(comment);
  })
}