const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();


// Token Format
// Authorization: Bearer <access_token>

// Verify Token
const verifyToken = (req, res, next) => {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // get access_token
    const bearer = bearerHeader.split(' ')[1];
    // assign it to the req ob
    req.token = bearer;
    // go to next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the API'
  });
});

app.post('/api/posts', verifyToken, (req, res) => {
  jwt.verify(req.token, 'cat_warrior', (err, data) => {
    if(err) return res.sendStatus(403);
    res.json({
      message: 'Post created..',
      data,
    })
  })
});

app.post('/api/login', (req, res) => {
  // Mock user
  const user = {
    id: 1,
    username: 'irlgabriel',
    email: 'radu.gabriel131@gmail.com'
  };
  jwt.sign({user: user}, 'cat_warrior', { expiresIn: '30s' }, (err, token) => {
    res.json({
      token: token
    })
  })
})


app.listen(process.env.PORT || 5000, () => console.log('Server running.'))

