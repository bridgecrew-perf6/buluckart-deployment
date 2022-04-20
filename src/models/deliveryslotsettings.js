'use strict';
module.exports = (sequelize, DataTypes) => {
  const deliverySlotSettings = sequelize.define('deliverySlotSettings', {
    OrderBuffertime: DataTypes.STRING,
    InstanceDelivery:DataTypes.BOOLEAN,
    testSlotId:DataTypes.INTEGER,
    OrderTimeTaken: DataTypes.STRING,
    MaxOrder: DataTypes.INTEGER,
    appDisplayMsg: DataTypes.TEXT
  }, {});
  deliverySlotSettings.associate = function(models) {
    // associations can be defined here
     models.deliverySlotSettings.belongsTo(models.deliveryTextSlotSettings, { foreignKey: 'testSlotId' });
  };
  return deliverySlotSettings;
};
