'use strict';
module.exports = (sequelize, DataTypes) => {
  const texStaticSettings = sequelize.define('texStaticSettings', {
    EnambleTex: DataTypes.BOOLEAN,
    GSTNumber : DataTypes.STRING,
    GSTState  : DataTypes.STRING,
    AllowCustomerGST:DataTypes.BOOLEAN,
    ApplyDiscountOnOrder: DataTypes.STRING,
    SetTax :DataTypes.STRING,
  


  }, {});
  texStaticSettings.associate = function(models) {
    // associations can be defined here
       models.texStaticSettings.hasMany(models.texDynamicSettings, { foreignKey: 'fixChargeId' });
  };
  return texStaticSettings;
};