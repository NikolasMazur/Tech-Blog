const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  checkPassword(passwordLogin) {
    return bcrypt.compareSync(passwordLogin, this.password);
  }
}

module.exports = User;