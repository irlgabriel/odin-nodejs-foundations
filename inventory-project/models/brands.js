var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BrandSchema = new Schema({
  name: {type: String, required: true, minlength: 1},
})

module.exports = mongoose.model('Brand', BrandSchema);