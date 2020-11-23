const express = require('express');
const router = express.Router();
const Book = require('../models/books');

// GET all books
router.get('/', async (req, res, next) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch(err) {
    res.json(err);
  }
})
router.get('/new', (req, res, next) => {
  res.render('bookform', { title: "Create new book" })
})
// GET book by id
router.get('/:book_id', async (req, res, next) => {
  try {
    const book = await Book.findOne({_id: req.params.book_id});
    res.json(book);
  } catch(err) {
    res.json(err);
  }
})
router.post('/', async (req, res, next) => {
  const { title, author, pages, isbn, stock, genre, price} = req.body;
  try {
    const newBook = await Book.create({
      title,
      author,
      pages,
      isbn,
      stock,
      genre,
      price
    })
    res.json(newBook);
  } catch(err) {
    res.json(err);
  }
})

router.put('/:book_id', (req, res, next) => {
  const updatedProps = {}; 
  Object.keys(req.body).forEach((key, index) => {
    updatedProps[req.body[index]] = req.body[key];
  })
  console.log(updatedProps)
})

router.delete('/:book_id', async (req, res, next) => {
  try {
    const deletedBook = Book.findOneAndDelete({_id: req.params.book_id});
    res.json(deletedBook);
  } catch(err) {
    res.json(err);
  }
})

module.exports = router;