'use strict';
module.exports = (sequelize, DataTypes) => {
  
  const varientModel = sequelize.define('varientModel', {
    sort: DataTypes.INTEGER,
    sku: DataTypes.STRING,
    waightunitno: DataTypes.STRING,
    productId:DataTypes.INTEGER,
    unit:DataTypes.STRING,
    mrp: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    minstock: DataTypes.INTEGER,
    outofstock: DataTypes.STRING
    
  }, {});
  varientModel.associate = function(models) {
    // associations can be defined here
  models.varientModel.belongsTo(models.product, { foreignKey: 'productId' });
  models.varientModel.hasMany(models.orderCart, { foreignKey: 'varientId' }); 

  };
  return varientModel;
};