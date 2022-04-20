'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('customerModels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Name:{
        type:Sequelize.STRING
      },
      avatar:{
        type:Sequelize.STRING
      },
      phone:{
        type:Sequelize.STRING
      },
      email:{
        type:Sequelize.STRING
      },
      totalOrder:{
        type:Sequelize.INTEGER
      },
      loyalityPoints: {
        type:Sequelize.INTEGER
      },
      status:{
        type:Sequelize.STRING
      },
      plateForm:{
      type:Sequelize.STRING
      },
      enrollNo:{
        type:Sequelize.STRING
      },
      activated:{
        type:Sequelize.BOOLEAN,
        default :false
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
    return queryInterface.dropTable('customerModels');
  }
};

