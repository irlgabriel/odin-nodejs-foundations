var express = require('express');
var router = express.Router();
var async = require('async');

var Item = require('../models/items');
var Category = require('../models/categories');
var Brand = require('../models/brands');


router.get('/', (req, res, next) => {
  async.parallel({
    itemsCount: function(callback) {
      Item.countDocuments(callback);
    },
    categoriesCount: function(callback) {
      Category.countDocuments(callback);
    },
    brandsCount: function(callback) {
      Brand.countDocuments(callback);
    }
  }, function(err, results) {
    if(err) return next(err);
    res.render('index', {title: 'Odin Marketplace', itemsCount: results.itemsCount, categoriesCount: results.categoriesCount, brandsCount: results.brandsCount});
  })
});

module.exports = router;
