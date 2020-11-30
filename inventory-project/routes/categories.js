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

const Category = require('../models/categories');
const Item = require('../models/items');
router.get('/', (req, res, next) => {

  Category.find((err, categories) => {
    if(err) return next(err);
    res.render('categories_list', {title: "Categories", categories});
  });
    

})
// GET items from this category
router.get('/:id/items', (req, res, next) => {
  Category.findById(req.params.id, (err, category) => {
    if(err) return next(err);
    Item.find({category: category._id})
    .populate('brand')
    .populate('category')
    .exec((err, items) => {
      if(err) return next(err);
      res.render('category_items', {title: category.name, items, category})
    })
  })
})
// GET Category form
router.get('/new', (req, res, next) => {
  res.render('category_form', {title: "Create new Category"})
})
// POST Category form
router.post('/new',[
  upload.single('image'),
  body('name').trim().isLength({min: 1}).escape(),
  (req, res, next) => {
    //Category.findOne() check first if the category already exists
    Category.create({name: req.body.name, image: req.file ? req.file.path : 'uploads/no_image.png'}, (err) => {
      if(err) return next(err);
      res.redirect('/categories');
    })
  }
])
router.get('/:id/edit', (req, res, next) => {
  Category.findById(req.params.id, (err, category) => {
    if(err) return next(err);
    res.render('category_form', {title: "Edit Category", category});
  })
})
router.post('/:id/edit', [
  upload.single('image'),
  body('name').trim().isLength({min: 1}).escape(),
  (req, res, next) => {
    Category.findByIdAndUpdate(req.params.id, {name: req.body.name, image: req.file ? req.file.path : 'uploads/no_image.png'}, (err, doc) => {
      if(err) return next(err);
      console.log(doc);
      res.redirect('/categories');
    })
  }
])

router.get('/:id/delete', (req, res, next) => {
  Category.findById(req.params.id, (err, category) => {
    if(err) return next(err);
    Item.find({category: category._id}, (err, items) => {
      if(err) return next(err);
        res.render('delete_category', {title: "Delete Category", category, items})
    })
  })
  
})

router.post('/:id/delete', (req, res, next) => {
  const password = req.body.password;
  if(password === process.env.DELETE_PASSWORD) {
    Category.findOneAndDelete({_id: req.params.id}, (err) => {
      if(err) return next(err);
      res.redirect('/categories')
    })
  } else {
    Category.findById(req.params.id, (err, category) => {
      if(err) return next(err);
      Item.find({category: category._id}, (err, items) => {
        if(err) return next(err);
          res.render('delete_category', {title: "Delete Category", category, items, error: 'Incorrect Password!'})
      })
    })
  }
})
module.exports = router;