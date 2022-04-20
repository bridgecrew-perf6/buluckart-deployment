'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true, 
        primaryKey: true,
        type: Sequelize.INTEGER
      },
  
      custId: {
        type:Sequelize.INTEGER
      },
    couponId:{
      type:Sequelize.INTEGER
    },
    paid:{
      type:Sequelize.STRING
    },
    number: {
      type:Sequelize.STRING
    },
    paymentmethod: {
      type:Sequelize.STRING
    },
    deliverydate:{
      type:Sequelize.DATE
    },
    shipingCharge:{
      type:Sequelize.INTEGER
    },
    couponAmount:{
      type:Sequelize.INTEGER
    },
    totalDiscount: {
      type:Sequelize.INTEGER
    },
    grandtotal: {
      type:Sequelize.INTEGER
    },
    paymentStatus:{
      type:Sequelize.STRING
    },
    WalletRefund:{
      type:Sequelize.INTEGER
    },
      status: {
        type: Sequelize.ENUM('processing','shipping','delieverd','cancel'),
				defaultValue: 'processing'
      },

      runners:{
        type:Sequelize.STRING,
       
      },
      runnersStatus:{
        type:Sequelize.ENUM("pending",'accepted','reject'),
        defaultValue:'pending'
      },
      settingId:{
        type:Sequelize.INTEGER
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
    return queryInterface.dropTable('Orders');
  }
};
