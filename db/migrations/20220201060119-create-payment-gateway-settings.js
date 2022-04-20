'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('paymentGatewaySettings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      statusMode: {
        type: Sequelize.BOOLEAN
      },
      KeyId: {
        type: Sequelize.STRING
      },
      SecrietKey: {
        type: Sequelize.STRING
      },
      paytamMarchentId: {
        type: Sequelize.STRING
      },
      paytamSecrietKey: {
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
    return queryInterface.dropTable('paymentGatewaySettings');
  }
};