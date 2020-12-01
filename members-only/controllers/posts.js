const { body, validationResult } = require('express-validator');

const Post = require('../models/posts');
const User = require('../models/users');

exports.create_post = [
  body('title').trim().isLength({min: 1}).escape(),
  body('content').trim().isLength({min: 1}).escape(),
  function(req, res) {
    const newPost = {...req.body};
    newPost.user_id = req.user._id
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.render('index', {title: 'Members Only', post: newPost, errors: errors.array()})
    }
    Post.create(newPost, (err, post) => {
      if(err) return res.json(err);
      res.redirect('/');
    })
  }
]

exports.get_edit_post = function(req, res) {
  Post.findById(req.params.id, (err, post) => {
    if(err) return res.json(err);
    res.render('edit_post', {title: 'Edit Post', post});
  })
}

exports.edit_post = [
  body('title').trim().isLength({min: 1}).escape(),
  body('content').trim().isLength({min: 1}).escape(),
  function(req, res) {
    const updatedPost = {...req.body}
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.render('edit_post', {title: 'Edit Post', errors: errors.array(), post: updatedPost});
    }
    Post.findByIdAndUpdate(req.params.id, updatedPost, (err, post) => {
      res.redirect('/');
    })
  }
]

exports.delete_post = function(req, res) {
  Post.findOneAndDelete({_id: req.params.id}, (err) => {
  if(err) return res.json(err);
  res.redirect('/');
  })
}