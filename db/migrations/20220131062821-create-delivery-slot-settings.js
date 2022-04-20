'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('deliverySlotSettings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      OrderBuffertime: {
        type: Sequelize.STRING
      },
      InstanceDelivery:{
        type: Sequelize.BOOLEAN
      },
      OrderTimeTaken: {
        type: Sequelize.STRING
      },
      MaxOrder: {
        type: Sequelize.INTEGER
      },
     testSlotId:{
       type: Sequelize.INTEGER
     },
      appDisplayMsg: {
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
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('deliverySlotSettings');
  }
};