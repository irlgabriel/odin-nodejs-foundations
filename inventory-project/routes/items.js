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
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
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
router.get('/new', async(req, res, next) => {
  res.render('item_form', {title: "Create new Item"})
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
    const errors = validationResult(req);
    const item = new Item({...req.body, brand: null, category: null})
    // check if file was sent
    if(req.file) item.image = req.file.pathname;

    // if there are any validation errors we render this page again and show them.
    // sending the item param so the input fields stay populated after re-render.
    if(!errors.isEmpty()) return res.render('item_form', {title: "Create new Item", errors: errors.array(), item})

    // else validation is successful
    // now check if the brand and category specified actually exist, if not then create them
    async.parallel(
      [
        function(callback) {
          Brand.findOne({name: req.body.brand}, (err, brand) => {
            if(err) return next(err);
            // if brand doesn't exist we create it and attach its id to the item
            if(!brand) {
              brand = Brand.create({name: req.body.brand}, (err, brand) => {
                if(err) return next(err);
                item.brand = brand._id;
              })
            // else we just find the brand and attach its id to the item 
            } else {
              item.brand = brand._id;
            }
            callback(null, item);
          })
        },
        function(callback) {
          Category.findOne({name: req.body.category}, (err, category) => {
            if(err) return next(err);
            // if category does not exist we create it and attach its id to the item
            if(!category) {
              category = Category.create({name: req.body.category}, (err, category) => {
                if(err) return next(err);
                item.category = category._id;
              })
            // else we just find it by name and attach the id to the newly created item
            } else {
              item.category = category._id;
            }
            callback(null, item);
          })
        }
      ],
      function(err) {
        if(err) return next(err)
        item.save((err, item) => {
          if(err) return next(err);
          res.redirect('/items/' + item._id);
        })
      }
    )
  }
])
// GET item edit form 
router.get('/:id/edit', (req, res, next) => {
  Item.findById(req.params.id)
  .populate('brand')
  .populate('category')
  .exec((err, item) => {
    if(err) return next(err);
    res.render('item_form', {title: "Edit Item", item})
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

    // Find Category and Brand by their names
    async.parallel([
      function(callback) {
        Category.findOne({name: req.body.category}, callback)
      },
      function(callback) {
        Brand.findOne({name: req.body.brand}, callback)
      }
    ], function(err, results) {
      if(err) return next(err);
      // If category doesn't exist, we create it and append its id to the updated item
      if(!results[0]) {
        Category.create({name: req.body.category}, (err, category) => {
          if(err) return next(err);
          updatedItem.category = category._id;
        })
        // else just appends its id
      } else {
        updatedItem.category = results[0].id
      }

      // If category doesn't exist, we create it and append its id to the updated item
      if(!results[1]) {
        Brand.create({name: req.body.category}, (err, brand) => {
          if(err) return next(err);
          updatedItem.brand = brand._id;
        })
        // else just appends its id
      } else {
        updatedItem.brand = results[1].id
      }
      // else validation is successful and we update the item
      Item.findOneAndUpdate({_id: req.params.id}, updatedItem, (err) => {
        res.redirect('/items/' + req.params.id)
      })
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