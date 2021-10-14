const Sequelize = require('sequelize');
const connection = require('../database/connection');
const BCrypt = require('../helpers/BCrypt');

// Admin definition
const Admin = connection.define('admin', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: true,
      notEmpty: true,
      isEmail: true
    }
  },
  encryptedPassword: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true
    }
  },
  password: {
    type: Sequelize.VIRTUAL,
    get() {
      return undefined;
    },
    set(value) {
      this.encryptedPassword = BCrypt.hashSync(value);
    }
  }
});

module.exports = Admin;
