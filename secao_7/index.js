// Core
const express = require('express');
const app = express();
const connection = require('./database/connection')

// Database config
connection.authenticate()
          .then(() => console.log('DB connected!'))
          .catch((error) => { throw new Error(error); });

// Models
const Category = require('./categories/Category');
const Article = require('./articles/Article');

// Controllers
const categoriesController = require('./categories/CategoriesController');
const articlesController = require('./articles/ArticlesController');

// Untils
const bodyParser = require('body-parser');

// Parser for requests with body
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Use EJS as view engine
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('public'));

// Application HTTP Port
app.listen(3000, () => {});

// Application routes
// Index
app.get('/', (req, res) => {
  var query = {};

  if(req.query.categoryId && !isNaN(req.query.categoryId)){
    query = {...query, ...{ categoryId: req.query.categoryId }};
  };

  Article.findAll({
    where: query,
    include: [{ model: Category }]
  }).then(articles => {
    Category.findAll().then(categories => {
      res.render('index', { articles: articles, categories: categories });
    });
  });
});

// Categories controller
app.use('/', categoriesController);

// Articles controller
app.use('/', articlesController);
