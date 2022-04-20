'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('LoyaltyPointModels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Points: {
       type:Sequelize.INTEGER
     },
     Amounts:{
      type:Sequelize.INTEGER
     },
     validFrome:{
      type:Sequelize.STRING
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
    return queryInterface.dropTable('LoyaltyPointModels');
  }
};