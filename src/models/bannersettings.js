'use strict';
module.exports = (sequelize, DataTypes) => {
  const bannerSettings = sequelize.define('bannerSettings', {
    BannerType: DataTypes.ENUM('topBanner','webFoterBanner','aboutUsBanner','CategoryBanner'),
    imageCaption: DataTypes.STRING,
    photoUrl: DataTypes.STRING,
    links: DataTypes.STRING,
    status:DataTypes.STRING
   
  }, {});
  bannerSettings.associate = function(models) {
    // associations can be defined here
  };
  return bannerSettings;
};

