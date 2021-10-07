const Sequelize = require('sequelize');
const connection = require('../database/connection.js');
const Category = require('./../categories/Category')
const slugify = require('slugify');

// Article definition
const Article = connection.define('article', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true
    }
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true
    }
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true
    }
  },
  categoryId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notNull: true,
      isInt: true
    }
  }
});

// Associations
Article.belongsTo(Category);
Category.hasMany(Article);

// Lifecycle
Article.beforeValidate(function(article, options) {
  article.slug = slugify(article.title);
})

module.exports = Article;
