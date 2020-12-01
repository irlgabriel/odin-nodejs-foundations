const express = require('express');
const router = express.Router();

const Post = require('../models/posts');

router.get('/', (req, res) => {
  Post.find() 
  .populate('user_id').exec((err, posts) => {
    if(err) return res.json(err);
    res.render('index', {title: 'Members Only', posts})
  })
})

module.exports = router;