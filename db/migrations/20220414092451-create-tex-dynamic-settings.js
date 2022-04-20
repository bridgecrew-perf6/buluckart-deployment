
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('texDynamicSettings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
       Sort: {
         type:Sequelize.INTEGER
       },
      FixedChargeLabel :{
        type:Sequelize.STRING
      },
      FixedChargeAmount  : {
        type:Sequelize.INTEGER
      },
      fixChargeId:{
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
    return queryInterface.dropTable('texDynamicSettings');
  }
};