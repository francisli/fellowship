'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Meetings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        unique: true
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
      startsAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      endsAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING
      },
      desc: {
        type: Sequelize.TEXT
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
    await queryInterface.addIndex('Meetings', {fields: ['uuid']});
    await queryInterface.addIndex('Meetings', {fields: ['CohortId', 'startsAt']});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Meetings');
  }
};