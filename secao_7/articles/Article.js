const Sequelize = require('sequelize');
const connection = require('../database/connection.js');

const Article = connection.define('articles', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

// Article.sync({force: true});

module.exports = Article;
