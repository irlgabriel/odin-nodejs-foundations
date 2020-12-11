const mongoose = require('mongoose');
const router = require('../routes/comment');
const Schema = mongoose.Schema;

const Comment = require('../models/comments');

const postSchema = new Schema({
  content: String,
  image: {type: Object},
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  likes: [{type: Schema.Types.ObjectId, ref: 'User'}],

}, {timestamps: true})

postSchema.post('findOneAndDelete', function(next) {
  console.log('running post delete middleware')
  Comment.deleteMany({post: this._id}, (err, deletedComments) => {
    if(err) return next(err);
    console.log(deletedComments);
    return next();
  })
})

module.exports = mongoose.model('Post', postSchema);