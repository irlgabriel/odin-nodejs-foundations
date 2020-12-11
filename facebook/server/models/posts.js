const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  content: String,
  image: {type: Object},
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  likes: [{type: Schema.Types.ObjectId, ref: 'User'}],

}, {timestamps: true})

module.exports = mongoose.model('Post', postSchema);