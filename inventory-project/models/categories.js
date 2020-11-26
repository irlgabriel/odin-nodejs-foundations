var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: {type: String, required: true, minlength: 1},

})

CategorySchema.virtual('url', function() {
  return "/category/" + this._id;
})

module.exports = mongoose.model('Category', CategorySchema);