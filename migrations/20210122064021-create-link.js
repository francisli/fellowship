'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Links', {
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
      position: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING
      },
      href: {
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
    await queryInterface.addIndex('Links', {fields: ['MeetingId', 'position']});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Links');
  }
};