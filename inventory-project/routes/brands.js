const { body, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();
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

const Brand = require('../models/brands');
const Item = require('../models/items');
const brands = require('../models/brands');
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
// GET brand form
router.get('/new', (req, res, next) => {
  res.render('brand_form', {title: "Create new Brand"})
})
// POST brand form
router.post('/new', [
  upload.single('image'),
  body('name').trim().isLength({min: 1}).escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) res.render('brand_form', {errors: errors.array()});

    // check if brand exists already
    Brand.findOne({name: req.body.name}, (err, brand) => {
      if(err) return next(err);
      if(brand) return res.render('brand_form', brand, {title: "Create new Brand", errors:["Brand already exists!"]});
      Brand.create({name: req.body.name, image: req.file ? req.file.path : 'uploads/no_image.png'}, (err, brand) => {
        if(err) return next(err);
        res.redirect(brand.url + '/items');
      })
    })
  }
])
router.get('/:id/edit', (req, res, next) => {
  Brand.findById(req.params.id, (err, brand) => {
    if(err) return next(err);
    res.render('brand_form', {title: 'Edit Brand', brand})
  })
})
router.post('/:id/edit', [
  upload.single('image'),
  body('name').trim().isLength({min: 1}).escape(),
  (req, res, next) => {
    Brand.findOneAndUpdate({_id: req.params.id}, {name: req.body.name, image: req.file ? req.file.path : 'uploads/no_image.png'}, (err, brand) => {
      if(err) return next(err);
      res.redirect(brand.url + '/items')
    });
  }
  
])
router.get('/:id/delete', (req, res, next) => {
  Brand.findOneAndDelete({_id: req.params.id}, (err) => {
    if(err) return next(err);
    res.redirect('/brands')
  })
})
module.exports = router;