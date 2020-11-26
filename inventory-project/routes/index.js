var express = require('express');
var router = express.Router();

var Item = require('../models/items');
var Category = require('../models/categories');
var Brand = require('../models/brands');


router.get('/', async (req, res, next) => {
  try {
    const itemsCount = await Item.countDocuments();
    const categoriesCount = await Category.countDocuments();
    const brandsCount = await Brand.countDocuments();
    res.render('index', {title: "Odin Marketplace", itemsCount, categoriesCount, brandsCount});
  } catch(err) {
    return next(err);
  }

});

module.exports = router;
