var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Item = require('./items');

var BrandSchema = new Schema({
  name: {type: String, required: true, minlength: 1, unique: true},
  image: {type: String, default: 'uploads/no_image.png'}
})

BrandSchema.virtual('url').get(function(){
  return '/brands/' + this._id;
})

BrandSchema.post('findOneAndDelete', function(next) {
  console.log('running post middleware on brand delete');
  Item.deleteMany({brand: this._id}, err => {
    if(err) return next(err);
  });
})

module.exports = mongoose.model('Brand', BrandSchema);