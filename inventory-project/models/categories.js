var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: {type: String, required: true, minlength: 1, unique: true},

})

CategorySchema.virtual('url').get(function() {
  return "/categories/" + this._id;
})

module.exports = mongoose.model('Category', CategorySchema);