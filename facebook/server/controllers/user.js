const passport = require("passport");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const multer = require("multer");
const AWS = require("aws-sdk");

const User = require("../models/users");

// AWS
const S3 = new AWS.S3();

const storage = multer.memoryStorage({
  destination: (req, file, callback) => {
    callback(null, "");
  },
});

const upload = multer({ storage: storage }).single("image");

exports.update_profile_photo = [
  upload,
  (req, res, next) => {
    console.log(req.file);
    const original_file = req.file.originalname.split(".");
    const format = original_file[original_file.length - 1];

    User.findById(req.params.user_id, (err, user) => {
      if (err) return res.status(400).json(err);

      const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: `${user._id}_profile.${format}`,
        Body: req.file.buffer,
      };

      //Delete previous instance from s3
      S3.deleteObject(
        { Bucket: params.Bucket, Key: params.Key },
        (err, data) => {
          if (err) return res.status(500).json(err);
          console.log(data);
        }
      );

      S3.upload(params, (err, data) => {
        if (err) return res.status(500).json(err);
        User.findOneAndUpdate(
          { _id: req.params.user_id },
          { profile_photo: data.Location },
          { new: true },
          (err, updatedUser) => {
            if (err) return res.status(400).json(err);
            return res.json(updatedUser);
          }
        );
      });
    });
  },
];

exports.update_cover_photo = [
  upload,
  (req, res, next) => {
    const original_file = req.file.originalname.split(".");
    const format = original_file[original_file.length - 1];

    User.findById(req.params.user_id, (err, user) => {
      if (err) return res.status(400).json(err);

      const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: `${user._id}_cover.${format}`,
        Body: req.file.buffer,
      };

      //Delete previous instance from s3
      S3.deleteObject(
        { Bucket: params.Bucket, Key: params.Key },
        (err, data) => {
          if (err) return res.status(500).json(err);
          console.log(data);
        }
      );

      S3.upload(params, (err, data) => {
        if (err) return res.status(500).json(err);
        User.findOneAndUpdate(
          { _id: req.params.user_id },
          { cover_photo: data.Location },
          { new: true },
          (err, updatedUser) => {
            if (err) return res.status(400).json(err);
            return res.json(updatedUser);
          }
        );
      });
    });
  },
];

exports.get_users = (req, res, next) => {
  User.find((err, users) => {
    if (err) return res.status(400).json(err);
    res.json(users);
  });
};

exports.get_user = (req, res, next) => {
  User.findById(req.params.user_id)
  .populate('friends')
  .exec((err, user) => {
    if (err) return res.status(400).json(err);
    return res.json(user);
  });
};
