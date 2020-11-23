const mongoose = require('mongoose');
const Book = require("./books");

const GenreSchema = mongoose.Schema({
  name: {type: String, required: true, unique: true}
}, {timestamps: true})

GenreSchema.post('findOneAndDelete', {document: true, query: false}, async (genre) => {
  console.log('running post middleware on findOneAndDelete on this genre doc', genre);
  const books = Book.find({genre: genre.name}); 
  books.forEach(book => {
    book.remove();
    book.save();
  })
})

module.exports = mongoose.model("Genre", GenreSchema);