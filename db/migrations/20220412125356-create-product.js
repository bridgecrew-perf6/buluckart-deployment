

'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type:Sequelize.STRING,
      },
      description:{
        type:Sequelize.TEXT,
      },
      photo:{
        type:Sequelize.STRING,
      },
      lableType:{
        type:Sequelize.STRING,
      },
        status: {
        type: Sequelize.STRING
      },
    
      isTex:{
        type: Sequelize.STRING
      },
      GSTrate:{
        type:Sequelize.INTEGER,
      },
      GSTtyp: {
        type:Sequelize.STRING,
      },
      HSNcode:{
        type:Sequelize.STRING,
      },
      categoryId: {
        type:Sequelize.INTEGER
      },
      subCategoryId: {
        type:Sequelize.INTEGER
      },
      videoUpload:{
        type:Sequelize.STRING
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
    return queryInterface.dropTable('products');
  }
};