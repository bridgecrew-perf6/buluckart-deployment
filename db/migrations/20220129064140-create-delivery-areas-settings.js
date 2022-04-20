'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('deliveryAreasSettings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Zone: {
        type: Sequelize.STRING
      },
      DeliveryAreaName: {
        type: Sequelize.STRING
      },
      MinimumOrderAmount: {
        type: Sequelize.INTEGER
      },
      ShippingFee: {
        type: Sequelize.INTEGER
      },
      allowcustomers: {
        type: Sequelize.BOOLEAN
      },
      ChargeShipping: {
        type: Sequelize.BOOLEAN
      },
      AdditionalNote: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('deliveryAreasSettings');
  }
};