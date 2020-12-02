const Comment = require('../models/comments');
const { body, validationResult } = require('express-validator');

exports.get_post_comments = (req, res, next) => {
  Comment.find({post: req.params.post_id}, (err, comments) => {
    if(err) return res.json(err);
    res.json(comments);
  })
}

exports.create_comment = [
  body('content').trim().isLength({min: 1}).escape(),
  (req, res, next) => {
    Comment.create({content, author: req.user._id, post: req.params.post_id}, (err, comment) => {
      if(err) return res.json(err);
      res.json(comment);
    })
  }
]

exports.edit_comment = [
  body('content').trim().isLength({min: 1}).escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.json(errors.array());
    Comment.findOneAndUpdate({_id: req.params.comment_id}, {content}, (err, updatedComment) => {
      if(err) return res.json(err);
      res.json(updatedComment);
    })
  }
]

exports.delete_comment = (req, res, next) => {
  Comment.findOneAndDelete({_id: req.params.comment_id}, (err, deletedComment) => {
    if(err) return res.json(err);
    res.json(deletedComment);
  })
}