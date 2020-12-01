const User = require('../models/users');

exports.index = function(req, res) {
  if(!req.user) return res.redirect('/users/login');
  if(req.user.isMember) return res.redirect('/index')
  res.render('member_index', {title: 'Become a member'});
}

exports.membership = function(req, res) {
  if(req.body.member_password === process.env.MEMBER_PASSWORD) {
    User.findById(req.params.id, (err, user) => {
      if(err) return res.json(err);
      user.isMember = true;
      user.save((err, user) => {
        if(err) res.json(err);
        res.redirect('/');
      })
    })
  } else {
    res.render('member_index', {title: 'Become a member', errors: [{msg: 'Incorrect Password'}]});
  }
  
}