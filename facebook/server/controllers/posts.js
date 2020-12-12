const { body, validationResult} = require('express-validator');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');

const Post = require('../models/posts');
const Notification = require('../models/notifications');
const User = require('../models/users');

// AWS
const S3 = new AWS.S3();

const storage = multer.memoryStorage({
  destination: (req, file, callback) => {
    callback(null, '')
  }
})

const upload = multer({storage: storage, }).single('image');

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
  upload,
  (req, res, next) => {
    const { content } = req.body;
    
    Post.create({content, user: req.user._id}, (err, post) => {
      if(err) return res.status(400).json(err);
    
      if(req.file) {
        const originalName = req.file.originalname.split('.');
        const format = originalName[originalName.length - 1];

        const params = {
          Bucket: process.env.AWS_BUCKET,
          Key: `${post._id}.${format}`,
          Body: req.file.buffer
        };
        S3.upload(params, (err, data) => {
          if(err) {
            console.log(err) 
          } else {
            post.image = {url: data.Location, id: post._id.toString() + '.' + format}
            post.save((err, post) => {
              if(err) return res.status(400).json(err);
              post
              .populate('user')
              .execPopulate()
              .then(post => res.json(post))
              .catch(err => res.json(err))
            });
          }
        })
      } else {
        post
        .populate('user')
        .execPopulate()
        .then(post => res.json(post))
        .catch(err => res.json(err))
      }
    })

    /*
    S3.upload(params, (error, data) => {
      if(error) {
        console.log(error) 
      } else {
        Post.create({content, user: req.user._id, image: {url: data.Location, id: data.Key}}, (err, post) => {
          if(err) return res.status(400).json(err);
          post
          .populate('user')
          .execPopulate()
          .then(populatedPost => res.json(populatedPost))
          .catch(err => console.log(err))
        })
      }
    })
    */
    
    // Add document to mongodb
    
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
      .exec(async(err, updatedPost) => {
        if(err) return res.status(400).json(err);

        // Send notification to the post's author;
        const from = await User.findOne({_id: user_id});
        const from_name = from.display_name || from.fullName;
        const to_name = updatedPost.user.display_name || updatedPost.user.full_name;
        Notification.create({from, to, message: `${from} liked your post`}, (err, notification) => {
          if(err) return res.status(400).json(err);
          return res.json(updatedPost);
        })
      })
    }
  })
}

exports.delete_post = (req, res, next) => {
  Post.findOneAndDelete({_id: req.params.post_id}, (err, post) => {
    if(err) return res.status(400).json(err);

    // Delete image from AWS, if there's any
    if(post.image) {
      const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: post.image.id
      }
      S3.deleteObject(params, (err, data) => {
        if(err) {
          next(err);
        } else {
          //console.log('Data: ', data);
        }
      })
    } 
    res.json(post);
  })
}
