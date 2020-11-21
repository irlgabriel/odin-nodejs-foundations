const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  res.writeHead(200, {"Content-Type": "text/html"});
  switch(req.url) {
    case "/":
      fs.readFile("index.html", (err, data) => {
        res.write(data)
        res.end();
      })
      break;
    case "/about":
      fs.readFile("about.html", (err, data) => {
        res.write(data)
        res.end()
      })
      break;
    case "/contact":
      fs.readFile("contact.html", (err, data) => {
        res.write(data)
        res.end();
      })
      break;
  }
}).listen(8080);