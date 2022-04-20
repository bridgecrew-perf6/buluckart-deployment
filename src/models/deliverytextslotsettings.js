'use strict';
module.exports = (sequelize, DataTypes) => {
  const deliveryTextSlotSettings = sequelize.define('deliveryTextSlotSettings', {
    timeSlotfrom: DataTypes.STRING,
    timeSlotTo: DataTypes.STRING,
    Day: DataTypes.STRING
  }, {});
  deliveryTextSlotSettings.associate = function(models) {
    // associations can be defined here
     models.deliveryTextSlotSettings.hasMany(models.deliverySlotSettings, { foreignKey: 'testSlotId' });
  };
  return deliveryTextSlotSettings;
};
