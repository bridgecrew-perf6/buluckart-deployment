'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pickupAreasSettings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      SelectCity: {
        type: Sequelize.STRING
      },
    
      Zone:{
        type:Sequelize.STRING
      },
      PickupAddress:{
        type:Sequelize.STRING
      },
      PickupPhone:{
        type:Sequelize.INTEGER
      },
      PickupEmail:{
        type:Sequelize.STRING
      },
      PickupLat:{
        type:Sequelize.STRING
      },
      PickupLng:{
        type:Sequelize.STRING
      },  
      AutoFill:{
        type:Sequelize.BOOLEAN
      },
      MinimumOrderAmount:{
        type:Sequelize.INTEGER
      },
      AdditionalNote:{
        type:Sequelize.TEXT
      },
      allowcustomers:{
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
    return queryInterface.dropTable('pickupAreasSettings');
  }
};