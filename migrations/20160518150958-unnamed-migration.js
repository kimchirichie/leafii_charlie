'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'feedback',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        },
        email: {
          type: Sequelize.STRING,
        },
        name: Sequelize.STRING,
        content: Sequelize.TEXT
      }
    );
  },
  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('feedback');
  }
};
