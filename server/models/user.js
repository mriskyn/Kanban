'use strict';
const bcrypt = require('bcrypt'), rounds = Math.floor(Math.random() * 100);

module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class User extends Model {}

  User.init({
    first_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'First Name is Empty!'
        }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Last Name is Empty!'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email is Empty!'
        },
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password is Empty!'
        }
      }
    }
  }, {sequelize})
  
  User.addHook('beforeCreate', (user) => {
    user.password = bcrypt.hashSync(user.password, rounds)
  })

  User.associate = function(models) {
    User.hasMany(models.Task);
  };
  return User;
};