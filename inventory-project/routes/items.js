const express = require('express');
const router = express.Router();

const Item = require('../models/items')

// GET all Items
router.get('/',  async(req, res, next) => {
  try {
    const items = await Item.find();
    res.render('items_list', {title: "Items", items});
  } catch(err) {
    return next(err);
  }
})

module.exports = router;