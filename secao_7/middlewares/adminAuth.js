const adminAuth = function (req, res, next) {
  if(req.session.admin){
    next();
  } else{
    res.redirect('/login');
  }
};

module.exports = adminAuth;
