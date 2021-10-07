const express = require('express');
const router = express.Router();
const Category = require('./Category.js');
const slugify = require('slugify');

router.get('/admin/categories', (req, res) => {
  Category.findAll().then(categories => {
    res.render('admin/categories/index', { categories: categories });
  })
})

router.post('/admin/categories/create', (req, res) => {
  var title = req.body.title;
  if(title){
    Category.create({
      title: title,
      slug: slugify(title)
    }).then(() => { res.redirect('/admin/categories') });
  }else{
    res.redirect('/admin/categories/new');
  }
})

router.post('/admin/categories/delete', (req, res) => {
  var id = req.body.id;
  if(id && !isNaN(id)){
    Category.destroy({ where: { id: id } }).then(() => res.redirect('/admin/categories') )
  }else{
    console.log(id);
    res.redirect('/admin/categories');
  }
});

router.get('/admin/categories/edit/:id', (req, res) => {
  var id = req.params.id;

  if(isNaN(id)){
    res.redirect('/admin/categories');
  }

  Category.findByPk(id).then(category => {
    if(category){
      res.render('admin/categories/edit', { category: category });
    }else{
      res.redirect('/admin/categories');
    }
  });
})

router.get('/admin/categories/new', (req, res) => {
  res.render('admin/categories/new');
})

router.post('/admin/categories/update/:id', (req, res) => {
  var id = req.params.id;  
  if(isNaN(id)){
    res.redirect('/admin/categories');
  }

  var title = req.body.title;
  Category.update({
    title: title,
    slug: slugify(title)
  }, {
    where: {
      id: id
    } 
  }).then(() => {
    res.redirect('/admin/categories');
  }); 

  // Category.findByPk(id).then(category => {
  //   var title = req.body.title;
  //   if(category){
  //     category.title = title;
  //     category.slug = slugify(category.title);
  //     category.save().then(() => {
  //       res.redirect('/admin/categories');
  //     });
  //   }else{
  //     res.redirect('/admin/categories');
  //   }
  // });
});

module.exports = router;
