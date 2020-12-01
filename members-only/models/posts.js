const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');


const PostSchema = new Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  user_id: {type: Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true})

PostSchema.virtual('time_ago').get(function() {
  return moment(this.createdAt).fromNow()
})

module.exports = mongoose.model('Post', PostSchema);