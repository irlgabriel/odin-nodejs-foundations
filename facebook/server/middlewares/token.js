const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
  jwt.sign({...req.user}, process.env.JWT_SECRET, (err, token) => {
    if(err) return next(err);
    res.json({user: req.user, token: token});
  })
}