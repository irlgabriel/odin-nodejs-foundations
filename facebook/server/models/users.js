const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: String,
  profile_photo: {type: String, default: 'https://scontent.ftce2-1.fna.fbcdn.net/v/t1.30497-1/cp0/c12.0.40.40a/p40x40/84241059_189132118950875_4138507100605120512_n.jpg?_nc_cat=1&ccb=2&_nc_sid=dbb9e7&_nc_ohc=qZvnHmkEQHsAX866QhX&_nc_ht=scontent.ftce2-1.fna&tp=27&oh=e62bb9b5c23b8cf60e72f4d03aa13a1c&oe=5FF2E41E'},
  password: String,
  facebookID: String,
  display_name: String,
  first_name: String,
  last_name: String,
}, {timestamps: true});

UserSchema.virtual('full_name').get(function() {
  return this.first_name + ' ' + this.last_name;
})

module.exports = mongoose.model('User', UserSchema);