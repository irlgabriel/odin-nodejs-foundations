const express = require('express');
const router = express.Router();

const Category = require('../models/categories');
const Item = require('../models/items');
router.get('/', async(req, res, next) => {
  try {
    const categories = await Category.find();
    res.render('categories_list', {title: "Categories", categories});
  } catch(err) {
    return next(err);
  }
})
// GET items from this category
router.get('/:id/items', (req, res, next) => {
  Category.findById(req.params.id, (err, category) => {
    if(err) return next(err);
    Item.find({category: category._id})
    .populate('brand')
    .populate('category')
    .exec((err, items) => {
      if(err) return next(err);
      res.render('category_items', {title: category.name, items, category})
    })
  })
})

module.exports = router;