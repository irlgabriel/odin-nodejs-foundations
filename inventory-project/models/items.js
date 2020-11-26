var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
  name: {type: String, required: true, minlength: 1},
  description: {type: String, required: true, minlength: 1},
  brand: {type: Schema.Types.ObjectId, ref: 'Brand'},
  category: {type: Schema.Types.ObjectId, ref: category},
  price: {type: String, required: true},
  stock: {type: String, required: true},
})