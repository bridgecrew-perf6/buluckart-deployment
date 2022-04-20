'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('referEarnModels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      discount: {
        type: Sequelize.STRING
      },
      DaysValidity: {
         type: Sequelize.INTEGER
      },
      Message: {
        type: Sequelize.TEXT
      },
      Notification: {
        type: Sequelize.TEXT
      },
      status:{
        type:Sequelize.BOOLEAN
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
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('referEarnModels');
  }
};