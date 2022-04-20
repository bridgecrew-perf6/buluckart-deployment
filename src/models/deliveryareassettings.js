'use strict';
module.exports = (sequelize, DataTypes) => {
  const deliveryAreasSettings = sequelize.define('deliveryAreasSettings', {
    Zone: DataTypes.STRING,
    DeliveryAreaName: DataTypes.STRING,
    MinimumOrderAmount: DataTypes.INTEGER,
    ShippingFee: DataTypes.INTEGER,
    allowcustomers: DataTypes.BOOLEAN,
    ChargeShipping: DataTypes.BOOLEAN,
    AdditionalNote: DataTypes.STRING
  }, {});
  deliveryAreasSettings.associate = function(models) {
    // associations can be defined here
  };
  return deliveryAreasSettings;
};