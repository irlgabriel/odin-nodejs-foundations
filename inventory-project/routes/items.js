const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const async = require('async');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})
const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/svg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

const Item = require('../models/items')
const Brand = require('../models/brands');
const Category = require('../models/categories');

// GET all Items
router.get('/',  async(req, res, next) => {
  try {
    const items = await Item.find();
    res.render('items_list', {title: "Items", items});
  } catch(err) {
    return next(err);
  }
})
// GET item form
router.get('/new', (req, res, next) => {
  async.parallel([
    function(callback) {
      Brand.find(callback)
    },
    function(callback) {
      Category.find(callback)
    }
  ], function(err, results) {
    if(err) return next(err);
      res.render('item_form', {title: "Create new Item", brands: results[0], categories: results[1]})
  })
})
// GET one item
router.get('/:id', (req, res, next) => {
  Item.findById(req.params.id)
  .populate('brand')
  .populate('category')
  .exec((err, item) => {
    if(err) return next(err);
    console.log(item);
    res.render('item', {title: item.name, item})
  })
})
// POST item form
router.post('/new', [
  upload.single('image'),
  body('brand').trim().isLength({min: 1}).escape(),
  body('category').trim().isLength({min: 1}).escape(),
  body('name').trim().isLength({min: 1}).escape(),
  body('description').trim().isLength({min: 1}).escape(),
  body('price').trim().isLength({min: 1}).isNumeric().withMessage("Price must be a number!").escape(),
  body('stock').trim().isLength({min: 1}).isNumeric().withMessage("Stock must be a number!").escape(),
  (req, res, next) => {
    console.log(req.file, req.body);
    const errors = validationResult(req);
    const item = new Item({...req.body, image: req.file ? req.file.path : 'uploads/no_image.png'})
    // check if file was sent

    // if there are any validation errors we render this page again and show them.
    // sending the item param so the input fields stay populated after re-render.
    if(!errors.isEmpty()) return res.render('item_form', {title: "Create new Item", errors: errors.array(), item})

    item.save(err => {
      res.redirect('/items');
    })
  
    
  }
])
// GET item edit form 
router.get('/:id/edit', (req, res, next) => {
  async.parallel([
    function(callback) {
      Brand.find(callback)
    },
    function(callback) {
      Category.find(callback)
    },
    function(callback) {
      Item.findById(req.params.id)
      .populate('brand')
      .populate('category')
      .exec(callback)
    }
  ], function(err, results) {
    if(err) return next(err);
    res.render('item_form', {title: "Edit Item", brands: results[0], categories: results[1], item: results[2]})
  })
  
})
// POST item form (EDIT)
router.post('/:id/edit', [
  upload.single('image'),
  body('brand').trim().isLength({min: 1}).escape(),
  body('category').trim().isLength({min: 1}).escape(),
  body('name').trim().isLength({min: 1}).escape(),
  body('description').trim().isLength({min: 1}).escape(),
  body('price').trim().isLength({min: 1}).isNumeric().withMessage("Price must be a number!").escape(),
  body('stock').trim().isLength({min: 1}).isNumeric().withMessage("Stock must be a number!").escape(),
  (req, res, next) => {
    const updatedItem = {...req.body, image: 'uploads/no_image.png'};
    if(req.file) updatedItem.image = req.file.path;
    console.log(req.body, req.file);
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.render('item_form', {title: "Edit Item", errors: errors.array(), item: updatedItem})

    Item.findOneAndUpdate({_id: req.params.id}, updatedItem, (err) => {
      res.redirect('/items/' + req.params.id)
    })
  }
])
// DELETE item
router.get('/:id/delete', (req, res, next) => {
  Item.findOneAndDelete({_id: req.params.id}, (err) => {
    if(err) return next(err);
    res.redirect('/items')
  })
})

module.exports = router;