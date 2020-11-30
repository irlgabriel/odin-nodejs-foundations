var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BrandSchema = new Schema({
  name: {type: String, required: true, minlength: 1, unique: true},
  image: {type: String, default: 'uploads/no_image.png'}
})

BrandSchema.virtual('url').get(function(){
  return '/brands/' + this._id;
})

module.exports = mongoose.model('Brand', BrandSchema);