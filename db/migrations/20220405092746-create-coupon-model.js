'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('couponModels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      offerName: {
        type: Sequelize.STRING
      },
       couponcode: {
         type: Sequelize.STRING
      },
       discountupto:{
         type: Sequelize.STRING
       },
     coupontype:{
         type: Sequelize.STRING
       },
       discount:{
         type:Sequelize.INTEGER
       },
       minOrderAmount:{
        type:Sequelize.INTEGER
      },
      useslimit: {
        type: Sequelize.STRING
      },
      dateFrome: {
         type: Sequelize.STRING
      },
      dateTo: {
        type: Sequelize.STRING
      },
      paymentMethode: {
        type : Sequelize.STRING
      },
      orderFacilities: {
         type :Sequelize.STRING
      },
      message:{
           type:Sequelize.STRING
         },
      active:{
        type:Sequelize.STRING
      },
      hideAction:{
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
    return queryInterface.dropTable('couponModels');
  }
};