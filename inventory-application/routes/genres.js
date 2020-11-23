const express = require('express');
const router = express.Router();
const Genre = require('../models/genres');

// GET all genres
router.get('/', async (req, res, next) => {
  try {
    const genres = Genre.find();
    res.json(genres);
  } catch(err) {
    res.json(err);
  }
})
// GET Genre by name
router.get('/:genre_name', async (req, res, next) => {
  try {
    const genre = Genre.findOne({name: req.params.genre_name});
    res.json(genre);
  } catch(err) {
    res.json(err)
  }
})
// POST Create new genre
router.post('/', async (req, res, next) => {
  try {
    const newGenre = Genre.create({name: req.body.name});
    res.json(newGenre);
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

router.delete('/:genre_id', async (req, res, next) => {
  try {
    const deletedGenre = await Genre.deleteOne({_id: req.params.genre_id});
    res.json(deletedGenre);
  } catch(err) {
    res.json(err);
  }
})

module.exports = router;