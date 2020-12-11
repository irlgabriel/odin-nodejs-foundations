const { body, validationResult } = require('express-validator');
const Comment = require('../models/comments');

module.exports.get_comments = (req, res, next) => {
  Comment.find({post: req.params.post_id})
  .populate('post')
  .populate('comment')
  .populate('user')
  .sort('-createdAt')
  .exec((err, comments) => {
    if(err) return res.status(400).json(err);
    res.json(comments);
  })
}

module.exports.create_comment = [
  body('content').trim().isLength({min: 1}).escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) return res.status(400).json(errors.array());

    const { content, comment } = req.body;

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
    .exec((err, comment) => {
      if(err) return res.status(400).json(err);
      res.json(comment);
    })
  }
]

module.exports.like_comment = (req, res, next) => {
  const user_id = req.user._id
  Comment.findOne({_id: req.params.comment_id}, (err, comment) => {
    if(err) return res.status(400).json(err)
    if(comment.likes.includes(user_id)) {
      Comment.findOneAndUpdate({_id: req.params.comment_id}, {$pull: {likes: user_id}}, {new: true}, (err, updatedComment) => {
        if(err) return res.status(400).json(err)
        updatedComment
        .populate('user')
        .populate('comment')
        .populate('post')
        .execPopulate()
        .then(populatedComment => res.json(populatedComment))
      })
    } else {
      Comment.findOneAndUpdate({_id: req.params.comment_id}, {$push: {likes: user_id}}, {new: true}, (err, updatedComment) => {
        if(err) return res.status(400).json(err)
        updatedComment
        .populate('user')
        .populate('comment')
        .populate('post')
        .execPopulate()
        .then(populatedComment => res.json(populatedComment))
      })
    }
  })
}

module.exports.delete_comment = (req, res, next) => {
  Comment.findOneAndRemove({_id: req.params.comment_id}, (err, comment) => {
    if(err) return res.status(400).json(err);
    res.json(comment);
  })
}