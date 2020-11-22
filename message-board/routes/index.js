var express = require('express');
var router = express.Router();

const messages = [
  {
    content: "First message!",
    user: "Gabriel", 
    added: new Date()
  },
  {
    content: "Another message",
    user: "notGabriel",
    added: new Date()
  },
  {
    content: "First message!",
    user: "Gabriel", 
    added: new Date()
  },
  {
    content: "Another message",
    user: "notGabriel",
    added: new Date()
  },
  {
    content: "First message!",
    user: "Gabriel", 
    added: new Date()
  },
  {
    content: "Another message",
    user: "notGabriel",
    added: new Date()
  }
]

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express Message Board!', messages: messages });
});

/* POST post a new message */
router.post('/message', (req, res, next) => {
  //console.log(req.body);
  messages.push({
    user: req.body.user,
    content: req.body.message,
    added: new Date(),
  })
  res.redirect("/");
})
module.exports = router;
