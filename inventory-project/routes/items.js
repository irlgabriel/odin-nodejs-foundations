const express = require('express');
const router = express.Router();

const Item = require('../models/items')

// GET all Items
router.get('/', (req, res, next) => {
  Item.find();
})