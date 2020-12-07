const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: String,
  profile_photo: String,
  facebookID: String,
  displayName: String,
}, {timestamps: true});

module.exports = mongoose.model('User', UserSchema);