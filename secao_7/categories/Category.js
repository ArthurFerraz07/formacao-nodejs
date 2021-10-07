const Sequelize = require('sequelize');
const connection = require('../database/connection.js');
const Article = require('../articles/Article.js')

const Category = connection.define('categories', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

Category.hasMany(Article);
Article.belongsTo(Category);

// Category.sync({force: true});

module.exports = Category;
