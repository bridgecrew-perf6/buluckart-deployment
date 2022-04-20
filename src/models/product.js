'use strict';
module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('product', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    photo:DataTypes.STRING,
    lableType:DataTypes.STRING,
    status: DataTypes.STRING,
    isTex:DataTypes.STRING,
    GSTrate:DataTypes.INTEGER,
    GSTtyp: DataTypes.STRING,
    HSNcode:DataTypes.STRING,
    videoUpload:DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    subCategoryId: DataTypes.INTEGER,
    settingId:DataTypes.INTEGER
  
 

   
  }, {});
  product.associate = function(models) {
    // associations can be defined here
     models.product.belongsTo(models.SubCategory, { foreignKey: 'subCategoryId' });
     models.product.belongsTo(models.category, { foreignKey: 'categoryId' });
     models.product.hasMany(models.productphoto, { foreignKey: 'productId' });
    // models.product.belongsTo(models.SubChildCategory, { foreignKey: 'childCategoryId' });
    models.product.hasMany(models.varientModel, { foreignKey: 'productId' });
    models.product.hasMany(models.reccomendProduct, { foreignKey: 'productId' });
    models.product.hasMany(models.tagModel, { foreignKey: 'productId' });
    models.product.hasMany(models.vendor_product, { foreignKey: 'productId' });  
    models.product.hasMany(models.customerCart, { foreignKey: 'productId' }); 
    models.product.hasMany(models.customerFavList, { foreignKey: 'productId' });
    models.product.belongsTo(models.featureSettings,{foreignKey:"settingId"})

  };
  return product;
};

