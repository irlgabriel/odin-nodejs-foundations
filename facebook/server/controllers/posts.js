const { body, validationResult} = require('express-validator');
const { findOneAndDelete, update } = require('../models/posts');
const Post = require('../models/posts');

exports.get_posts = (req, res, next) => {
  Post.find().sort('-createdAt').exec((err, posts) => {
    if(err) return res.status(400).json(err);

    Post.populate(posts, {path: 'user'}, (err, populatedPosts) => {
      if(err) return res.status(400).json(err);
      res.json(populatedPosts);
    })
  })
}

exports.create_post = [
  body('content').trim().isLength({min: 1}).escape(),
  /* multer image middleware */
  (req, res, next) => {
    const { content } = req.body;
    Post.create({content, user: req.user._id}, (err, post) => {
      if(err) return res.status(400).json(err);
      post
      .populate('user')
      .execPopulate()
      .then(populatedPost => res.json(populatedPost))
      .catch(err => console.log(err))
    })
  }
]

exports.edit_post = [
  body('content').trim().isLength({min: 1}).escape(),
  (req, res, next) => {
    const { content } = req.body;
    Post.findOneAndUpdate({_id: req.params.post_id}, {content}, {new: true})
    .populate('user')
    .exec((err, post) => {
      if(err) return res.status(400).json(err);
      res.json(post);
    })
  }
]

exports.like_post = (req, res, next) => {
  const user_id = req.user._id;
  Post.findOne({_id: req.params.post_id}, (err, post) => {
    if(err) return res.status(400).json(err);
    if(post.likes.includes(user_id)) {
      Post.findOneAndUpdate({_id: req.params.post_id}, {$pull: {likes: user_id}}, {new: true})
        .populate('user')
        .exec((err, updatedPost) => {
        if(err) return res.status(400).json(err);
        return res.json(updatedPost);
      })
    } else {
      Post.findOneAndUpdate({_id: req.params.post_id}, {$push: {likes: user_id}}, {new: true})
      .populate('user')
      .exec((err, updatedPost) => {
        if(err) return res.status(400).json(err);
        return res.json(updatedPost);
      })
    }
  })
}

exports.delete_post = (req, res, next) => {
  Post.findOneAndDelete({_id: req.params.post_id}, (err, post) => {
    if(err) return res.status(400).json(err);
    res.json(post);
  })
}
