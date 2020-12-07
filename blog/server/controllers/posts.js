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

exports.publish_post = (req, res, next) => {
  Post.findOneAndUpdate({_id: req.params.post_id}, {published: true}, {useFindAndModify: false, new: true})
  .populate('author')
  .exec((err, post) => {
    if(err) return res.status(400).json(err);
    res.json(post);
  })
}

exports.unpublish_post = (req, res, next) => {
  Post.findOneAndUpdate({_id: req.params.post_id}, {published: false}, {useFindAndModify: false, new: true})
  .populate('author')
  .exec((err, post) => {
    if(err) return res.status(400).json(err);
    res.json(post);
  })
}

exports.create_post = [
  body('title').trim().isLength({min: 1}).escape(),
  body('content').trim().isLength({min: 1}).escape(),
  (req, res, next) => {  
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.json(errors.array());

    const {title, content, published} = req.body;
    Post.create({title, content, author: req.user._id, published}, (err, post) => {
      if(err) return res.json(err);
      post.populate('author', (err, populatedPost) => {
        res.json(populatedPost);
      })
    })
  }
]

exports.edit_post = [
  body('title').isLength({min: 1}).escape(),
  body('content').isLength({min: 1}).escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) return res.json(errors.array());

    const {title, content} = req.body;
    Post.findOneAndUpdate({_id: req.params.post_id}, {title, content}, {useFindAndModify: false, new: true}, (err, updatedPost) => {
      if(err) return res.status(400).json(err);
      updatedPost.populate('author', (err, populatedPost) => {
        if(err) return res.status(400).json(err);
        res.json(populatedPost);
      })
    })
  }
]

exports.delete_post = (req, res, next) => {
  Post.findOneAndDelete({_id: req.params.post_id}, (err, deletedPost) => {
    if(err) return res.json(err);
    res.json(deletedPost);
  })
}


