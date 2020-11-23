const express = require('express');
const router = express.Router();
const Genre = require('../models/genres');

// GET all genres
router.get('/', async (req, res, next) => {
  try {
    const genres = await Genre.find();
    res.render('genres', {title: "Genres", genres: genres})
  } catch(err) {
    res.json(err);
  }
})
// GET Genre form
router.get('/new', (req, res, next) => {
  res.render('genreform', { title: "Create new Genre" });
})
// GET Genre by name
router.get('/:genre_name', async (req, res, next) => {
  try {
    const genres = await Genre.find();
    const genre = await Genre.findOne({name: req.params.genre_name});
    //res.json(genre);
    res.render('genre', {genres: genres, genre: genre, title: genre.name});
  } catch(err) {
    res.json(err)
  }
})
// POST Create new genre
router.post('/', async (req, res, next) => {
  try {
    const newGenre = await Genre.create({name: req.body.name});
    const genres = await Genre.find();
    //res.json(newGenre);
    res.render('genre', {title: newGenre.name, genre: newGenre, genres: genres});
  } catch(err) {
    res.json(err);
  }
})

// PUT Edit genre
router.put('/:genre_id', async (req, res, next) => {
  try {
    const updatedGenre = Genre.findOneAndUpdate({_id: req.params.genre_id}, {new: true}, {name: req.body.name});
    res.json(updatedGenre);
  } catch(err) {
    res.json(err);
  }
})
//DELETE Delete genre (!!!) this deletes all the books associated with it as well
router.delete('/:genre_id', async (req, res, next) => {
  try {
    const deletedGenre = await Genre.deleteOne({_id: req.params.genre_id});
    res.json(deletedGenre);
  } catch(err) {
    res.json(err);
  }
})

module.exports = router;