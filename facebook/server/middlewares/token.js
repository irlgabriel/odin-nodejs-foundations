const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  jwt.sign({user: req.user._id}, process.env.JWT_SECRET, (err, token) => {
    if (err) return next(err);
    res.json({ user: req.user._id, token: token });
  });
};
