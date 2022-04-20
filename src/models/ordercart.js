'use strict';
module.exports = (sequelize, DataTypes) => {
  const orderCart = sequelize.define('orderCart', {
    productId: DataTypes.INTEGER,
    addressId: DataTypes.INTEGER,
    productName: DataTypes.STRING,
    TaxType: DataTypes.STRING,
    GSTrate: DataTypes.INTEGER,
    taxAmount: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER,
    varientId: DataTypes.INTEGER,
    mrp: DataTypes.INTEGER,
    waightunitno: DataTypes.STRING,
    unit: DataTypes.STRING,
    discount: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    photo: DataTypes.STRING,
    comments: DataTypes.STRING
  }, {});
  orderCart.associate = function (models) {
    // associations can be defined here
    models.orderCart.belongsTo(models.Address, { foreignKey: 'addressId' });
    models.orderCart.belongsTo(models.Order, { foreignKey: 'orderId' });
    models.orderCart.belongsTo(models.varientModel, { foreignKey: 'varientId' });
  };
  return orderCart; 88888
};