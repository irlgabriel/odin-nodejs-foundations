const { body, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();

const Category = require('../models/categories');
const Item = require('../models/items');
router.get('/', (req, res, next) => {

  Category.find((err, categories) => {
    if(err) return next(err);
    res.render('categories_list', {title: "Categories", categories});
  });
    

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
// GET Category form
router.get('/new', (req, res, next) => {
  res.render('category_form', {title: "Create new Category"})
})
// POST Category form
router.post('/new',[
  body('name').trim().isLength({min: 1}).escape(),
  (req, res, next) => {
    Category.create({name: req.body.name}, (err, category) => {
      res.redirect('/categories');
    })
  }
])
router.get('/:id/edit', (req, res, next) => {
  Category.findById(req.params.id, (err, category) => {
    if(err) return next(err);
    res.render('category_form', {title: "Edit Category", category});
  })
})
router.post('/:id/edit', [
  body('name').trim().isLength({min: 1}).escape(),
  (req, res, next) => {
    Category.findByIdAndUpdate(req.params.id, {name: req.body.name}, (err, category) => {
      if(err) return next(err);
      res.redirect('/categories');
    })
  }
])

module.exports = router;