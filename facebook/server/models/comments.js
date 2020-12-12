const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = require('../models/comments');

const commentSchema = new Schema({
  content: String,
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  post: {type: Schema.Types.ObjectId, ref: 'Post'},
  comment: {type: Schema.Types.ObjectId, ref: 'Comment'},
  likes: [{type: Schema.Types.ObjectId, ref: 'User'}]
}, {timestamps: true})

commentSchema.pre('findOneAndRemove', function() {
  this.findOne((err, comment) => {
    if(err) return res.status(400).json(err);
      Comment.deleteMany({comment_id: comment}, (err, deletedComments) => {
        if(err) return res.status(400).json(err);
        //console.log(deletedComments)
      })
  }) 
})

module.exports = mongoose.model('Comment', commentSchema);