'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('storeInformationSettings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
       StoreName: {
         type:Sequelize.STRING
       },
        StoreContactPerson :{
          type:Sequelize.STRING
        },
        StoreContactNumber:{
          type:Sequelize.INTEGER
        },
        StoreEmail:{
          type:Sequelize.STRING
        },
        Location: {
          type:Sequelize.STRING
        },
        City : {
          type:Sequelize.STRING
        },
        State: {
          type:Sequelize.STRING
        },
        Country : {
          type:Sequelize.STRING
        },
        Timezone : {
          type:Sequelize.STRING
        },
        Zipcode : {
          type:Sequelize.INTEGER
        },
        Currency : {
          type:Sequelize.STRING
        },
        AppShareLink : {
          type:Sequelize.STRING
        },
        AndroidShareLink : {
          type:Sequelize.STRING
        },
        phoneShareLink : {
          type:Sequelize.STRING
        },
        ShowCurrency : {
          type:Sequelize.STRING
        },
        UploadStoreLogo : {
          type:Sequelize.STRING
        },
       photoUrl : {
          type:Sequelize.STRING
        },
        AboutUs : {
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
    return queryInterface.dropTable('storeInformationSettings');
  }
};