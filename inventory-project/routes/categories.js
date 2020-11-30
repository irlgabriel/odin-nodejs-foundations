var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Item = require('./items');

var CategorySchema = new Schema({
  name: {type: String, required: true, minlength: 1, unique: true},
  image: {type: String, default: 'uploads/no_image.png'},

})

CategorySchema.virtual('url').get(function() {
  return "/categories/" + this._id;
})

CategorySchema.post('findOneAndDelete', function(next) {
  console.log('running post middleware on category delete');
  Item.deleteMany({category: this._id}, err => {
    if(err) return next(err);
  });
})

module.exports = mongoose.model('Category', CategorySchema);