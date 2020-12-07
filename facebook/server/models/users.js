const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: String,
  password: String,
  image: String,
  facebookID: String,
}, {timestamps: true});

module.exports = mongoose.model('User', UserSchema);