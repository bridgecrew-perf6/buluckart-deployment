'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('alertMsgModels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      alerttext: {
         type: Sequelize.STRING
      },
      pushstatus: {
         type:Sequelize.BOOLEAN
      },
      clients: {
        type:Sequelize.STRING
      },
    reason: {
       type:Sequelize.STRING
    },
    message: {
        type:Sequelize.TEXT
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
    return queryInterface.dropTable('alertMsgModels');
  }
};