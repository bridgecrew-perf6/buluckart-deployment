'use strict';
module.exports = (sequelize, DataTypes) => {
  const productVideo = sequelize.define('productVideo', {
    videoUrl: DataTypes.STRING
  }, {});
  productVideo.associate = function(models) {
    // associations can be defined here
  };
  return productVideo;
};