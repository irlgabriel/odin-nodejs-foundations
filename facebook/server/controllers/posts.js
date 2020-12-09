const { body, validationResult} = require('express-validator');
const { findOneAndDelete } = require('../models/posts');
const Post = require('../models/posts');

exports.get_posts = (req, res, next) => {
  Post.find((err, posts) => {
    if(err) return res.status(400).json(err);

    Post.populate(posts, {path: 'user'}, (err, populatedPosts) => {
      if(err) return res.status(400).json(err);
      console.log(populatedPosts)
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
      res.json(post);
    })
  }
]

exports.edit_post = [
  body('content').trim().isLength({min: 1}).escape(),
  (req, res, next) => {
    const { content } = req.body;
    Post.findOneAndUpdate({content}, {new: true}, (err, post) => {
      if(err) return res.status(400).json(err);
      res.json(post);
    })
  }
]

exports.delete_post = (req, res, next) => {
  Post.findOneAndDelete({_id: req.params.post_id}, (err, post) => {
    if(err) return res.status(400).json(err);
    res.json(post);
  })
}
