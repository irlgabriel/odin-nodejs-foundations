const express = require('express');
const router = express.Router();
const Book = require('../models/books');
const Genre = require('../models/genres');
// GET all books
router.get('/', async (req, res, next) => {
  try {
    const books = await Book.find();
    const genres = await Genre.find();
    //res.json(books);
    res.render('books', {genres: genres, title: "All books", books: books});
  } catch(err) {
    res.json(err);
  }
})
// GET Genre form
router.get('/new', async (req, res, next) => {
  const genres = await Genre.find();
  res.render('bookform', { title: "Create new book", genres: genres});
})
// GET all books from this genre
router.get('/genres/:genre_name', async (req, res, next) => {
  const books = await Book.find({genre: req.params.genre_name});
  const genres = await Genre.find();
  res.render('books', {title: `Books in ${req.params.genre_name}`, genres: genres, books: books })
})

// GET book by id
router.get('/:book_id', async (req, res, next) => {
  try {
    const book = await Book.findOne({_id: req.params.book_id});
    const genres = await Genre.find();
    res.render('book', {title: book.title, genres: genres, book: book});
  } catch(err) {
    res.json(err);
  }
})
// POST - create post
router.post('/', async (req, res, next) => {
  const { title, author, pages, description, stock, genre, price} = req.body;
  try {
    const newBook = await Book.create({
      title,
      author,
      pages,
      description,
      stock,
      genre,
      price
    })
    const genres = await Genre.find();
    //res.json(newBook);
    res.render('book', { title: book.title,  book: newBook, genres: genres});
  } catch(err) {
    res.json(err);
  }
})
// PUT - Edit post
router.put('/:book_id', (req, res, next) => {
  const updatedProps = {}; 
  Object.keys(req.body).forEach((key, index) => {
    updatedProps[req.body[index]] = req.body[key];
  })
  console.log(updatedProps)
})
// DELETE - Delete post
router.delete('/:book_id', async (req, res, next) => {
  try {
    const deletedBook = Book.findOneAndDelete({_id: req.params.book_id});
    res.json(deletedBook);
    
  } catch(err) {
    res.json(err);
  }
})

module.exports = router;