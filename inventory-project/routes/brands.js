const express = require('express');
const router = express.Router();

const Brand = require('../models/brands');

router.get('/', async(req, res, next) => {
  try {
    const brands = await Brand.find();
    res.render('brands_list', {title: "Brands", brands});
  } catch(err) {
    return next(err);
  }
})

module.exports = router;