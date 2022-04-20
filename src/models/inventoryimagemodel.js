'use strict';
module.exports = (sequelize, DataTypes) => {
  const inventoryImageModel = sequelize.define('inventoryImageModel', {
    photoUrl: DataTypes.STRING,
    name: DataTypes.STRING
  }, {});
  inventoryImageModel.associate = function(models) {
    // associations can be defined here
  };
  return inventoryImageModel;
};