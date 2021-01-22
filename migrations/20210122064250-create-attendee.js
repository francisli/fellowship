'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Attendees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MeetingId: {
        references: {
          model: {
            tableName: 'Meetings'
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
    await queryInterface.addIndex('Attendees', {fields: ['MeetingId', 'UserId'], unique: true});
    await queryInterface.addIndex('Attendees', {fields: ['UserId']});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Attendees');
  }
};
