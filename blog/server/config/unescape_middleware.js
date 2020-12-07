module.exports = (escaped, char) => function (req, res, next) {
  unescapeCharacter(req.body, escaped, char);
  return next();
}

function unescapeCharacter (obj, escaped, char) {
  for (const key in obj) {
      // Replace the escaped version with the character
      if (typeof obj[key] === 'string') obj[key] = obj[key].replace(new RegExp(escaped, "g"), char);
  }
}