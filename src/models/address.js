
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    fullname: DataTypes.STRING,
    custId: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    orderId: DataTypes.INTEGER,
    house: DataTypes.STRING,
    landmark: DataTypes.STRING,
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    discrict: DataTypes.STRING,
    states: DataTypes.STRING,
    area: DataTypes.STRING,
    mapId: DataTypes.INTEGER,
    shipping: DataTypes.TEXT
  }, {});
  Address.associate = function (models) {
    // associations can be defined here
    models.Address.belongsTo(models.Order, { foreignKey: 'orderId' });
    models.Address.hasMany(models.orderCart, { foreignKey: 'addressId' });
    models.Address.belongsTo(models.customerModel, { foreignKey: 'custId' });
    models.Address.belongsTo(models.mapcustomeradress, { foreignKey: 'mapId' });
  };
  return Address;
};


