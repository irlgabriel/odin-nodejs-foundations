const { body, validationResult } = require('express-validator');

const Post = require('../models/posts');
const passport = require('passport');

exports.get_posts = (req, res, next) => {
  Post.find()
  .populate('author')
  .sort('-createdAt')
  .exec((err, posts) => {
    if(err) return res.json(err);
    res.json(posts);
  })
} 

exports.create_post = [
  body('title').trim().isLength({min: 1}).escape(),
  body('content').trim().isLength({min: 1}).escape(),
  (req, res, next) => {  
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.json(errors.array());

    const {title, content} = req.body;
    Post.create({title, content, author: req.user._id}, (err, post) => {
      if(err) return res.json(err);
      res.json(post);
    })
    
  }
]

exports.edit_post = [
  body('title').trim().isLength({min: 1}).escape(),
  body('content').trim().isLength({min: 1}).escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) return res.json(errors.array());

    const {title, content} = req.body;

    Post.findOneAndUpdate({_id: req.params.post_id}, {title, content}, (err, updatedPost) => {
      if(err) return res.json(err);
      res.json(updatedPost);
    })
  }
]

exports.delete_post = (req, res, next) => {
  Post.findOneAndDelete({_id: req.params.post_id}, (err, deletedPost) => {
    if(err) return res.json(err);
    res.json(deletedPost);
  })
}


