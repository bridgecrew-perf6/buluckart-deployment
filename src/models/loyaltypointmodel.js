'use strict';
module.exports = (sequelize, DataTypes) => {
  const LoyaltyPointModel = sequelize.define('LoyaltyPointModel', {
    Points: DataTypes.INTEGER,
    Amounts: DataTypes.INTEGER,
    validFrome: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
  }, {});
  LoyaltyPointModel.associate = function(models) {
    // associations can be defined here
  };
  return LoyaltyPointModel;
};