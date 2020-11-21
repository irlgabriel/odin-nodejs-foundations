const express = require('express');
const app = express();
const path = require('path');

app.listen(8080, () => console.log("Server started on port 8080"));

const errorHandler = (err, req, res, next) => {
  if(err) res.sendFile(path.resolve(__dirname, "404.html"));
  next();
}

app.use(errorHandler);


app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
})

app.get('/contact', (req, res) => {
  res.sendFile(path.resolve(__dirname, "contact.html"));
})

app.get('/about', (req, res) => {
  res.sendFile(path.resolve(__dirname, "about.html"));
})