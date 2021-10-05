const Sequelize = require('sequelize');

const connection = new Sequelize('formacao_node_secao_7', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = connection;
