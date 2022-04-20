'use strict';
module.exports = (sequelize, DataTypes) => {
  const paymentGatewaySettings = sequelize.define('paymentGatewaySettings', {
    statusMode: DataTypes.BOOLEAN,
    KeyId: DataTypes.STRING,
    SecrietKey: DataTypes.STRING,
    paytamMarchentId: DataTypes.STRING,
    paytamSecrietKey: DataTypes.STRING
  }, {});
  paymentGatewaySettings.associate = function(models) {
    // associations can be defined here
  };
  return paymentGatewaySettings;
};