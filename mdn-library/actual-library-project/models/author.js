const { DateTime } = require('luxon');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
  first_name: {type: String, required: true, maxlength: 100},
  family_name: {type: String, required: true, maxlength: 100},
  date_of_birth: {type: Date},
  date_of_death: {type: Date},
})

AuthorSchema
.virtual('fullname')
.get(function() {
  return this.family_name + ' ' +  this.first_name;
})

AuthorSchema
.virtual('lifespan')
.get(function() {
  return this.date_of_death - this.date_of_birth;
})

AuthorSchema
.virtual('lifespan_formatted')
.get(function() {
  const birth = DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED)
  const death = DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED);
  if(this.date_of_birth) {
    if(this.date_of_death) {
      return birth + ' - ' + death;
    } else {
      return birth;
    }
  } else {
    return "no birth info";
  }
})

AuthorSchema
.virtual('url')
.get(function() {
  return `/catalog/author/${this._id}`;
})

module.exports = mongoose.model('Author', AuthorSchema);