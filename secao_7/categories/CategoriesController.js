const express = require('express');
const router = express.Router();
const slugify = require('slugify');
const Category = require('./Category');
const Helper = require('./../helpers/Helper');

router.get('/admin/categories', (req, res) => {
  Category.findAll().then(categories => {
    res.render('admin/categories/index', { categories: categories });
  })
})

router.post('/admin/categories/create', (req, res) => {
  var category = Category.build({
    title: req.body.title
  })
  Helper.save(category).then(() => {
    res.redirect('/admin/categories')
  }).catch(e => {
    res.send(e);
  });
})

router.post('/admin/categories/delete', (req, res) => {
  if(req.body.id && !isNaN(req.body.id)){
    Category.destroy({ where: { id: req.body.id } }).then(() => res.redirect('/admin/categories') )
  }else{
    res.redirect('/admin/categories');
  }
});

router.get('/admin/categories/:id/edit', (req, res) => {
  if(isNaN(req.params.id)){
    res.redirect('/admin/categories');
  }

  Category.findByPk(req.params.id).then(category => {
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
  if(isNaN(req.params.id)){
    res.redirect('/admin/categories');
  }

  Category.findByPk(req.params.id).then(category => {
    Object.assign(category, {
      title: req.body.title
    })
    Helper.save(category).then(() => {
      res.redirect('/admin/categories')
    }).catch(e => {
      res.send(e);
    });
  })

  // Category.update({
  //   title: title,
  //   slug: slugify(title)
  // }, {
  //   where: {
  //     id: id
  //   } 
  // }).then(() => {
  //   res.redirect('/admin/categories');
  // }); 

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
