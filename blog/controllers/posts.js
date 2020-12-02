const Post = require('../models/posts');
const passport = require('passport');

exports.get_posts = (req, res, next) => {
  Post.find((err, posts) => {
    if(err) return res.json(err);
    res.json(posts);
  })
} 

exports.create_post = (req, res, next) => {
  const {title, content} = req.body;
  Post.create({title, content, author: req.user._id}, (err, post) => {
    if(err) return res.json(err);
    res.json(post);
  })
}