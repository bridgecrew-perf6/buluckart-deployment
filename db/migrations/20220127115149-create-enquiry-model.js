'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('enquiryModels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      plateform: {
        type:Sequelize.STRING
      },
      name: {
        type:Sequelize.STRING
      },
      email:{
        type:Sequelize.STRING
      },
      phoneno: {
        type:Sequelize.INTEGER
      },
      Message: {
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
    return queryInterface.dropTable('enquiryModels');
  }
};