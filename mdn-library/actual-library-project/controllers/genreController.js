const async = require('async');
const { body, validationResult } = require("express-validator");
const { render } = require('pug');

var Book = require('../models/book');
var Genre = require('../models/genre');

// Display list of all Genre.
exports.genre_list = function(req, res) {
    Genre.find()
    .sort([['name', 'ascending']])
    .exec(function (err, list_genres) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('genre_list', { title: 'Genre List', genre_list: list_genres });
    });
};

// Display detail page for a specific Genre.
exports.genre_detail = function(req, res, next) {
    Genre.findById(req.params.id, (err, genre) => {
        if(err) return next(err);
        if(!genre) return next(new Error('Genre not found'))
        Book.find({genre: genre._id}, (err, books) => {
            if(err) return next(err);
            res.render('genre_detail', {title: "Genre Detail", genre: genre, books: books})
        })
    })
};

// Display Genre create form on GET.
exports.genre_create_get = function(req, res) {
    res.render('genre_form', {title: 'Create Genre'});
};

// Handle Genre create on POST.
exports.genre_create_post = [
    //validate and sanitise the name field
    body('name', 'Genre name required').trim().isLength({ min: 1}).escape(),
    (req, res, next) =>  {
        const errors = validationResult(req);
        var genre = new Genre({name: req.body.name})

        if(!errors.isEmpty()) {
            res.render('genre_form', {title: 'Create Genre', genre: genre, errors: errors.array()});
            return;
        } else {
            // Data form is valid
            // Check if this genre already exists
            Genre.findOne({name: req.body.name})
            .exec(function(err, found_genre) {
                if(err) return next(err);
                if(found_genre) return res.redirect(found_genre.url);
                genre.save(function(err) {
                    res.redirect(genre.url);
                })
            })
        }
    }
];

// Display Genre delete form on GET.
exports.genre_delete_get = function(req, res) {
    async.parallel({
        genre: function(callback) {
            Genre.findById(req.params.id).exec(callback)
        },
        genre_books: function(callback) {
            Book.find({genre: req.params.id}).exec(callback)
        },
    }, function(err, results) {
        if(err) return next(err);
        res.render('genre_delete', {title: "Delete Genre", genre: results.genre, genre_books: results.genre_books});
    })

};

// Handle Genre delete on POST.
exports.genre_delete_post = function(req, res, next) {
    var genre_id = req.body.genreid;
    Genre.findByIdAndDelete(genre_id)
    .exec(function(err) {
        if(err) return next(err);
        res.redirect('/catalog/genres');
    })
};

// Display Genre update form on GET.
exports.genre_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre update GET');
};

// Handle Genre update on POST.
exports.genre_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre update POST');
};