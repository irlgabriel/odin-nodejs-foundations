const express = require('express');
const router = express.Router();

const Brand = require('../models/brands');
const Item = require('../models/items');
router.get('/', (req, res, next) => {
  Brand.find((err, brands) => {
    if(err) return next(err);
    res.render('brands_list', {title: "Brands", brands});
  })
})
// GET brand items
router.get('/:id/items', (req, res, next) => {
  Brand.findById(req.params.id, (err, brand) => {
    if(err) return next(err);
    Item.find({brand: brand._id})
    .populate('brand')
    .populate('category')
    .exec((err, items) => {
      if(err) return next(err);
      res.render('brand_items', {title: brand.name, items, brand})
    })
  })
})

module.exports = router;