const Comment = require('../models/comments');
const { body, validationResult } = require('express-validator');

exports.get_post_comments = (req, res, next) => {
  Comment.find({post: req.params.post_id})
  .populate('author')
  .populate('post')
  .sort('-createdAt')
  .exec((err, comments) => {
    if(err) return res.json(err);
    res.json(comments);
  })
}

exports.create_comment = [
  body('content').trim().isLength({min: 1}).escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.json(errors.array());

    Comment.create({content: req.body.content, author: req.user._id, post: req.params.post_id}, (err, comment) => {
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

    const content = req.body.content;

    Comment.findOneAndUpdate({_id: req.params.comment_id}, {content}, {new:true, useFindAndModify: false}).populate('author').exec((err, updatedComment) => {
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
