'use strict';
module.exports = (sequelize, DataTypes) => {
  const customerFavList = sequelize.define('customerFavList', {
    custId:DataTypes.INTEGER,
    productId:DataTypes.INTEGER,
    varientId:DataTypes.INTEGER,
   	productName:DataTypes.STRING,
  	productPrice:DataTypes.INTEGER,
  	productMrp:DataTypes.INTEGER,
  	qty:DataTypes.INTEGER,
	  productDiscount:DataTypes.INTEGER,
    grandTotal:DataTypes.INTEGER,
    productDescription:DataTypes.STRING
  }, {});
  customerFavList.associate = function(models) {
    // associations can be defined here
      models.customerFavList.belongsTo(models.product,{ foreignKey: 'productId' }); 
     models.customerFavList.belongsTo(models.customerModel,{ foreignKey: 'custId' }); 
  };
  return customerFavList;
};


