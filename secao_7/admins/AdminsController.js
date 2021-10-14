const express = require('express');
const router = express.Router();
const Admin = require('./Admin');
const BCrypt = require('../helpers/BCrypt');

router.get('/login', (req, res) => {
  res.render('admins/login');
});

router.post('/login', (req, res) => {
  Admin.findOne({
    where: { email: req.body.email }
  }).then((admin) => {
    if(admin && BCrypt.compareSync(req.body.password, admin.encryptedPassword)){
      req.session.admin = admin;
      req.session.adminId = admin.id;
      console.log(req.session)
      res.redirect('/');
    } else {
      res.redirect('/login');
    }
  }).catch(() => {
    res.redirect('/login');
  });
});

router.get('/logout', (req, res) => {
  req.session.admin = null;
  req.session.adminId = null;
  res.redirect('/');
});

module.exports = router;
