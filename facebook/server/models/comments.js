const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: String,
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  post: {type: Schema.Types.ObjectId, ref: 'Post'},
  comment: {type: Schema.Types.ObjectId, ref: 'Comment'},
  likes: [{type: Schema.Types.ObjectId, ref: 'User'}]
}, {timestamps: true})

module.exports = mongoose.model('Comment', commentSchema);