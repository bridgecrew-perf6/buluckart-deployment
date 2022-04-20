'use strict';
module.exports = (sequelize, DataTypes) => {
  const reccomendProduct = sequelize.define('reccomendProduct', {
    productName: DataTypes.STRING,
    productId:DataTypes.INTEGER,
    reccomendedId: DataTypes.INTEGER
  }, {});
  reccomendProduct.associate = function(models) {
    // associations can be defined here
     models.reccomendProduct.belongsTo(models.product, { foreignKey: 'productId' });
  };
  return reccomendProduct;
};