'use strict';
const bcrypt = require('bcrypt'), rounds = Math.floor(Math.random() * 100);

module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class User extends Model {}

  User.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {sequelize})
  
  User.addHook('beforeCreate', (user) => {
    user.password = bcrypt.hashSync(user.password, rounds)
  })

  User.associate = function(models) {
    User.hasMany(models.Task);
  };
  return User;
};