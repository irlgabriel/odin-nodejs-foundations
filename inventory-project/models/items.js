var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
  name: {type: String, required: true, minlength: 1},
  description: {type: String, required: true, minlength: 1},
  brand: {type: Schema.Types.ObjectId, ref: 'Brand'},
  category: {type: Schema.Types.ObjectId, ref: 'Category'},
  price: {type: String, required: true},
  stock: {type: String, required: true},
  image: {type: String, default: 'uploads/no_image.png'},
})

ItemSchema.virtual('url').get(function(){
  return "/items/" + this._id;
})

module.exports = mongoose.model('Item', ItemSchema);