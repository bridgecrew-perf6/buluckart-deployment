'use strict';
module.exports = (sequelize, DataTypes) => {
  const pickupAreasSettings = sequelize.define('pickupAreasSettings', {
    SelectCity: DataTypes.STRING,
    Zone:DataTypes.STRING,
    PickupAddress:DataTypes.STRING,
    PickupPhone:DataTypes.INTEGER,
    PickupEmail:DataTypes.STRING,
    PickupLat:DataTypes.STRING,
    PickupLng:DataTypes.STRING,  
    AutoFill:DataTypes.BOOLEAN,
    MinimumOrderAmount:DataTypes.INTEGER,
    AdditionalNote:DataTypes.TEXT,
    allowcustomers:DataTypes.BOOLEAN 
  }, {});
  pickupAreasSettings.associate = function(models) {
    // associations can be defined here
  };
  return pickupAreasSettings;
};