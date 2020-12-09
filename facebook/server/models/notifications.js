const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  to: {type: Schema.Types.ObjectId, ref: 'User'},
  message: String
})

module.exports = mongoose.model('Notification', notificationSchema);
