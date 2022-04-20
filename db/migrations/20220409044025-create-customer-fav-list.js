'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('customerFavLists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      custId:{
        type:Sequelize.INTEGER
        },
        productId:{
        type:Sequelize.INTEGER
      },
        varientId:{
        type:Sequelize.INTEGER
      },
        productName:{
          type:Sequelize.STRING
        },
        productPrice:{
        type:Sequelize.INTEGER
      },
        productMrp:{
        type:Sequelize.INTEGER
      },
        qty:{
        type:Sequelize.INTEGER
      },
        productDiscount:{
        type:Sequelize.INTEGER
      },
        grandTotal:{
        type:Sequelize.INTEGER
      },
        productDescription:{
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
    return queryInterface.dropTable('customerFavLists');
  }
};