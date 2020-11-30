var express = require('express');
var router = express.Router();
var async = require('async');

var Item = require('../models/items');
var Category = require('../models/categories');
var Brand = require('../models/brands');


router.get('/', (req, res, next) => {
  async.parallel([
   function(callback) {
      Category.find(callback);
    },
    function(callback) {
      Brand.find(callback);
    }
  ], function(err, results) {
    if(err) return next(err);
    res.render('index', {title: 'Odin Marketplace', categories: results[0], brands: results[1]});
  })
});

module.exports = router;
