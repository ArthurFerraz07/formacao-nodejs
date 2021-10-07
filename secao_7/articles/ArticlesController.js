const express = require('express');
const router = express.Router();
const Article = require('./Article');
const Category = require('./../categories/Category');
const Helper = require('./../helpers/Helper')

router.get('/admin/articles', (req, res) => {
  Article.findAll({
    include: [{ model: Category }]
  }).then(articles => {
    res.render('admin/articles/index', { articles: articles });
  })
});

router.get('/admin/articles/new', (req, res) => {
  res.render('admin/articles/new');
});

router.post('/admin/articles/create', (req, res) => {
  var article = Article.build({
    title: req.body.title,
    body: 'req.body.title',
    categoryId: 1
  })
  Helper.save(article).then(() => {
    res.redirect('/admin/articles')
  }).catch(e => {
    res.send(e);
  });
});

module.exports = router;
