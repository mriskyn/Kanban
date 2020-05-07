'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tasks', [
      {
        title: 'sarapan',
        category: 'backlog',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'makan siang',
        category: 'todo',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'makan malam',
        category: 'done',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'buka puasa',
        category: 'completed',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'sahur',
        category: 'backlog',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tasks', null, {});
  }
};
