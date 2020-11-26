const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const async = require('async');

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
router.get('/:id', async(req, res, next) => {
  try {
    const item = Item.findById(req.params.id);
    res.render('item', {title: item.name, item})
  } catch(err) {
    return next(err);
  } 
})
// POST item form
router.post('/new', [
  body('brand').trim().isLength({min: 1}).escape(),
  body('category').trim().isLength({min: 1}).escape(),
  body('name').trim().isLength({min: 1}).escape(),
  body('description').trim().isLength({min: 1}).escape(),
  body('price').trim().isLength({min: 1}).isNumeric().withMessage("Price must be a number!").escape(),
  body('stock').trim().isLength({min: 1}).isNumeric().withMessage("Stock must be a number!").escape(),
  async(req, res, next) => {
    const errors = validationResult(req);
    const item = new Item({
      brand: req.body.brand,
      category: req.body.category,
      description: req.body.description,
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
    })

    // if there are any validation errors we render this page again and show them
    // sending the item param so the input fields stay populated after re-render.
    if(!errors.isEmpty()) return res.render('item_form', {title: "Create new Item", errors: errors.array(), item})

    // else validation is successful
    // now check if the brand and category specified actually exist, if not then create them
 
    async.parallel(
      [
        async () => {
          let brand = await Brand.findOne({name: item.brand})
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
        },
        async () => {
          let category = await Category.find({name: item.category})
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
          
        }
      ],
      function() {
        item.save((err, item) => {
          if(err) return next(err);
          res.redirect('/items/' + item._id);
        })
      }
    )
    

  }
])
// PUT item form (EDIT)
router.put('/:id/edit', [
  body('brand').trim().isLength({min: 1}).escape(),
  body('category').trim().isLength({min: 1}).escape(),
  body('name').trim().isLength({min: 1}).escape(),
  body('description').trim().isLength({min: 1}).escape(),
  body('price').trim().isLength({min: 1}).isNumeric().withMessage("Price must be a number!").escape(),
  body('stock').trim().isLength({min: 1}).isNumeric().withMessage("Stock must be a number!").escape(),
  async (req, res, next) => {

    const item = await Item.findById(req.params.id);
    const updatedItem = {
      brand: req.body.brand,
      category: req.body.category,
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock
    }
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.render('item_form', {title: "Edit Item", errors: errors.array(), item})

    // else validation is successful and we update the item
    item.update(updatedItem, (err) => {
      if(err) return next(err);
    })
  }
])
// DELETE item
router.delete('/:id', async(req, res, next) => {
  try{
    await Item.deleteOne({_id: req.params.id})
  } catch(err) {
    return next(err);
  }
})

module.exports = router;