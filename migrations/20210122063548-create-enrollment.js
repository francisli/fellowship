'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Enrollments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      CohortId: {
        references: {
          model: {
            tableName: 'Cohorts'
          },
          key: 'id'
        },
        allowNull: false,
        type: Sequelize.INTEGER
      },
      UserId: {
        references: {
          model: {
            tableName: 'Users'
          },
          key: 'id'
        },
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addIndex('Enrollments', {fields: ['CohortId', 'UserId'], unique: true});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Enrollments');
  }
};