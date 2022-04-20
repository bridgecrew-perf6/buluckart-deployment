
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('bannerSettings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      BannerType:   {
        type: Sequelize.ENUM('topBanner','webFoterBanner','aboutUsBanner','CategoryBanner'),
			
      },
      imageCaption: {
        type:Sequelize.STRING
      },
      photoUrl: {
        type:Sequelize.STRING
      },
      links: {
        type:Sequelize.STRING
      },
      status:{
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
    return queryInterface.dropTable('bannerSettings');
  }
};