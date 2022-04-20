'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('featureSettings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      storeStatus: {
        type: Sequelize.BOOLEAN
      },
      deliveryArea: {
        type: Sequelize.STRING
      },
     
      recomendedProduct: {
        type: Sequelize.BOOLEAN
      },
      deliverySlotStatus: {
        type: Sequelize.BOOLEAN
      },
      loyaltyProgram: {
        type: Sequelize.BOOLEAN
      },
      pickUpAdress: {
        type: Sequelize.BOOLEAN
      },
      delivery: {
        type: Sequelize.BOOLEAN
      },
      mobileNotrification: {
        type: Sequelize.BOOLEAN
      },
      emailNotification: {
        type: Sequelize.BOOLEAN
      },
      smsNotification: {
        type: Sequelize.BOOLEAN
      },
      COD: {
        type: Sequelize.BOOLEAN
      },
      socialLogIn: {
        type: Sequelize.BOOLEAN
      },
      googleAnalyticKey: {
        type: Sequelize.STRING
      },
      feacebookPixleKey: {
        type: Sequelize.STRING
      },
      googleId: {
        type: Sequelize.STRING
      },
      feacebookId: {
        type: Sequelize.STRING
      },
      googleAnalyticPixleKey: {
        type: Sequelize.STRING
      },
      productTitleHomepage: {
        type: Sequelize.STRING
      },
      noOfCategory: {
        type: Sequelize.INTEGER
      },
      reccemendProductNo: {
        type: Sequelize.INTEGER
      },
      emailMandetory: {
        type: Sequelize.BOOLEAN
      },
      storeLogo: {
        type: Sequelize.STRING
      },
      enableRatting: {
        type: Sequelize.BOOLEAN
      },
      mapEnable: {
        type: Sequelize.BOOLEAN
      },
      appTitle: {
        type: Sequelize.BOOLEAN
      },
      homePageTitle: {
        type: Sequelize.STRING
      },
      appSubTitle: {
        type: Sequelize.BOOLEAN
      },
      appHeader: {
        type: Sequelize.STRING
      },
      showCOD: {
        type: Sequelize.BOOLEAN
      },
      displayNumber: {
        type: Sequelize.STRING
      },
      numberType:{
        type:Sequelize.STRING
      },
      ageRistriction: {
        type: Sequelize.BOOLEAN
      },
      innoviceAmount: {
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
    return queryInterface.dropTable('featureSettings');
  }
};
