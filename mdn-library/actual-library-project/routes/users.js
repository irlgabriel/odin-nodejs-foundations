var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
/* GET cool route */
router.get('/cool', (req, res, next) => {
  res.send("You are so cool");
})
module.exports = router;
