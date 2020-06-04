'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class Task extends Model {}

  Task.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Your Title is Empty!'
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Your Title is Empty!'
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {sequelize})


  Task.associate = function(models) {
    Task.belongsTo(models.User);
  };
  return Task;
};