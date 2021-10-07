const Sequelize = require('sequelize');

const connection = new Sequelize('formacao_node_secao_7', 'arthur', '123456', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = connection;
