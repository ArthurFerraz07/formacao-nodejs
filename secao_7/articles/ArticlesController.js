const express = require('express');
const router = express.Router();
const Article = require('./Article');
const Category = require('./../categories/Category');
const Helper = require('./../helpers/Helper');
const adminAuth = require('./../middlewares/adminAuth');

router.get('/articles', (req, res) => {
  var query = {};

  if(req.query.categoryId && !isNaN(req.query.categoryId)){
    query = {...query, ...{ categoryId: req.query.categoryId }};
  };

  Article.findAll({
    where: query
  }).then(articles => {
    Category.findAll().then(categories => {
      res.render('articles/index', { articles: articles, categories: categories });
    });
  });
});

router.get('/articles/:id', (req, res) => {
  Article.findOne({
    where: { slug: req.params.id },
    include: [{ model: Category }]
  }).then(article => {
    Category.findAll().then(categories => {
      res.render('articles/show', { article: article, categories: categories });
    });
   });
});

router.get('/admin/articles', adminAuth, (req, res) => {
  Article.findAll({
    include: [{ model: Category }]
  }).then(articles => {
    res.render('admin/articles/index', { articles: articles });
  })
});

router.post('/admin/articles/create', adminAuth, (req, res) => {
  var article = Article.build({
    title: req.body.title,
    body: req.body.body,
    categoryId: req.body.categoryId
  })
  Helper.save(article).then(() => {
    res.redirect('/admin/articles')
  }).catch(e => {
    res.send(e);
  });
});

router.post('/admin/articles/delete', adminAuth, (req, res) => {
  if(req.body.id && !isNaN(req.body.id)){
    Article.destroy({ where: { id: req.body.id } }).then(() => res.redirect('/admin/articles') )
  }else{
    res.redirect('/admin/articles');
  }
});

router.get('/admin/articles/:id/edit', adminAuth, (req, res) => {
  Article.findByPk(req.params.id).then(article => {
    Category.findAll().then( categories => {
      res.render('admin/articles/edit', { article: article, categories: categories});
    })
  });
});

router.get('/admin/articles/new', adminAuth, (req, res) => {
  Category.findAll().then( categories => {
    res.render('admin/articles/new', { categories: categories });
  })
});

router.post('/admin/articles/:id/update', adminAuth, (req, res) => {
  Article.findByPk(req.params.id).then(article => {
    article.update({
      categoryId: req.body.categoryId,
      title: req.body.title,
      body: req.body.body
    }).then(() => res.redirect('/admin/articles'));
  });
});

module.exports = router;
