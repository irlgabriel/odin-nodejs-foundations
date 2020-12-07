const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: String,
  profile_photo: String,
  password: String,
  facebookID: String,
  displayName: String,
  first_name: String,
  last_name: String,
}, {timestamps: true});

UserSchema.virtual('full_name').get(function() {
  return this.first_name + ' ' + this.last_name;
})

module.exports = mongoose.model('User', UserSchema);