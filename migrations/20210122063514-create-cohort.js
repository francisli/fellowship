'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Cohorts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      slug: {
        allowNull: false,
        type: Sequelize.CITEXT,
        unique: true
      },
      startsOn: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      endsOn: {
        allowNull: false,
        type: Sequelize.DATEONLY
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
    await queryInterface.addIndex('Cohorts', {fields: ['name']});
    await queryInterface.addIndex('Cohorts', {fields: ['slug']});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Cohorts');
  }
};
