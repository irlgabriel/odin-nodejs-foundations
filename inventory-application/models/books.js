const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = Schema({
  title: {type: String, required: true},
  author: {type: String, required: true},
  description: {type: String, required: true},
  genre: {type: String, ref: "Genre"},
  price: {type: Number, required: true},
  pages: {type: Number, required: true},
  stock: {type: Number, required: true},

}, {timestamps: true})

module.exports = mongoose.model('Book', BookSchema);