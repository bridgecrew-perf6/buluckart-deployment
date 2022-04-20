'use strict';
module.exports = (sequelize, DataTypes) => {
  const couponModel = sequelize.define('couponModel', {
    offerName: DataTypes.STRING,
    couponcode: DataTypes.STRING,
    discountupto: DataTypes.STRING,
    coupontype: DataTypes.STRING,
    discount: DataTypes.INTEGER,
    minOrderAmount: DataTypes.INTEGER,
    useslimit: DataTypes.STRING,
    dateFrome: DataTypes.STRING,
    dateTo: DataTypes.STRING,
    paymentMethode: DataTypes.STRING,
    orderFacilities: DataTypes.STRING,
    message:DataTypes.STRING,
    active:DataTypes.STRING,
    hideAction:DataTypes.STRING

  }, {});
  couponModel.associate = function(models) {
    // associations can be defined here
     models.couponModel.hasMany(models.Order, { foreignKey: 'couponId' });
  };
  return couponModel;
};