'use strict';
module.exports = (sequelize, DataTypes) => {
  const LoyaltyPointCouponModel = sequelize.define('LoyaltyPointCouponModel', {
    loyaltyPoints: DataTypes.INTEGER,
    AmountsOff: DataTypes.INTEGER,
    couponCode: DataTypes.STRING,
    validFrome: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
  }, {});
  LoyaltyPointCouponModel.associate = function(models) {
    // associations can be defined here
  };
  return LoyaltyPointCouponModel;
};