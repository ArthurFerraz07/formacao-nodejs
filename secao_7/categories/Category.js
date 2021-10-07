const Sequelize = require('sequelize');
const { default: slugify } = require('slugify');
const connection = require('../database/connection.js');

// Category definition
const Category = connection.define('category', {
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
  }
});

// Lifecycle
Category.beforeValidate(function(category, options) {
  options.fields ||= [];
  options.fields.push('slug');
  category.slug = slugify(category.title);
})

module.exports = Category;
