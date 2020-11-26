const express = require('express');
const router = express.Router();

const Category = require('../models/categories');

router.get('/', async(req, res, next) => {
  try {
    const categories = await Category.find();
    res.render('categories_list', {title: "Categories", categories});
  } catch(err) {
    return next(err);
  }
})

module.exports = router;