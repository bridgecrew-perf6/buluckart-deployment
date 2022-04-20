'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('mapcustomeradresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      custId: {
        type: Sequelize.INTEGER
      },
      addressType: {
        type: Sequelize.STRING
      },
      house: {
        type: Sequelize.INTEGER
      },
      street: {
        type: Sequelize.STRING
      },
      landmark: {
        type: Sequelize.STRING
      },
      area: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      discrict: {
        type: Sequelize.STRING
      },
      states: {
        type: Sequelize.STRING
      },
      pincode: {
        type: Sequelize.INTEGER
      },
      latitude: {
        type: Sequelize.DOUBLE
      },
      longitude: {
        type: Sequelize.DOUBLE
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
    return queryInterface.dropTable('mapcustomeradresses');
  }
};

