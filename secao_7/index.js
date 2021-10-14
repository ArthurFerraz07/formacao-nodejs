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
const adminsController = require('./admins/AdminsController');

// Middlewares
const adminAuth = require('./middlewares/adminAuth');

// Untils
const bodyParser = require('body-parser');
const session = require('express-session');

// Parser for requests with body
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Sessions manager
app.use(session({
  secret: 'SecretSalt',
  cookie: { maxAge: 36000000 }
}));

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

  page = req.query.page && parseInt(req.query.page) > 0 ? parseInt(req.query.page) : 1
  per_page = req.query.per_page && parseInt(req.query.per_page) > 0 ? parseInt(req.query.per_page) : 10

  limit = per_page
  offset = (limit * (page - 1))

  Article.findAndCountAll({
    where: query,
    include: [{ model: Category }],
    limit: limit,
    offset: offset
  }).then(q => {
    Category.findAll().then(categories => {
      articles = q.rows;
      articles_count = q.count;
      next_offset = (limit * page)
      has_next = next_offset < articles_count;
      has_previous = offset > 0;

      res.render('index', {
        articles: articles,
        categories: categories,
        has_next: has_next,
        has_previous: has_previous,
        current_page: page
      });
    });
  });
});

// Categories controller
app.use('/', categoriesController);

// Articles controller
app.use('/', articlesController);

// Admins Controller
app.use('/', adminsController);
