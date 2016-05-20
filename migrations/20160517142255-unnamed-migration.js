'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'users',
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
          unique: true
        },
        password: Sequelize.STRING,
        firstName: Sequelize.STRING,
        lastName: Sequelize.STRING,
        url: {
          type: Sequelize.STRING,
          unique: true
        },
        location: Sequelize.STRING,
        keywords: Sequelize.TEXT,
        admin: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: false
        }
      }
    );
  },
  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('users');
  }
};
