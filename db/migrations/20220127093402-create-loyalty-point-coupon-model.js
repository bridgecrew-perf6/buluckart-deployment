'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('LoyaltyPointCouponModels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
       loyaltyPoints: {
         type:Sequelize.INTEGER
       },
       AmountsOff: {
          type:Sequelize.INTEGER
       },
       couponCode:{
           type:Sequelize.STRING
       },
       validFrome: {
           type: Sequelize.STRING
       },
       status: {
         type: Sequelize.BOOLEAN
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
    return queryInterface.dropTable('LoyaltyPointCouponModels');
  }
};