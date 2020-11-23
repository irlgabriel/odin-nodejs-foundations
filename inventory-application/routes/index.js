var express = require('express');
var router = express.Router();
const Genre = require('../models/genres');

/* GET home page. */
router.get('/', async (req, res, next) => {
  const genres = await Genre.find();
  res.render('index', { title: 'Express Book Shop', genres: genres });
});

module.exports = router;
