'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('locations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
  
      zipcode: {
          type: Sequelize.INTEGER
      },
      name: {
          type: Sequelize.STRING
        },
      status: {
        type: Sequelize.ENUM('active', 'inactive'),
				defaultValue: 'active'
      },
       
      latitude:{
        type: Sequelize.STRING
      },
      longitude:{
        type:Sequelize.STRING
      },
      hex:{
        type:Sequelize.STRING
      },
      mapUrl:{
        type:Sequelize.STRING
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
    return queryInterface.dropTable('locations');
  }
};