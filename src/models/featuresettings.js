'use strict';
module.exports = (sequelize, DataTypes) => {
  const featureSettings = sequelize.define('featureSettings', {
    storeStatus: DataTypes.BOOLEAN,
    deliveryArea: DataTypes.STRING,
    recomendedProduct: DataTypes.BOOLEAN,
    deliverySlotStatus: DataTypes.BOOLEAN,
    loyaltyProgram: DataTypes.BOOLEAN,
    pickUpAdress: DataTypes.BOOLEAN,
    delivery: DataTypes.BOOLEAN,
    mobileNotrification: DataTypes.BOOLEAN,
    emailNotification: DataTypes.BOOLEAN,
    smsNotification: DataTypes.BOOLEAN,
    COD: DataTypes.BOOLEAN,
    socialLogIn: DataTypes.BOOLEAN,
    googleAnalyticKey: DataTypes.STRING,
    feacebookPixleKey: DataTypes.STRING,
    googleId: DataTypes.STRING,
    feacebookId: DataTypes.STRING,
    googleAnalyticPixleKey: DataTypes.STRING,
    productTitleHomepage: DataTypes.STRING,
    noOfCategory: DataTypes.INTEGER,
    reccemendProductNo: DataTypes.INTEGER,
    emailMandetory: DataTypes.BOOLEAN,
    storeLogo: DataTypes.STRING,
    enableRatting: DataTypes.BOOLEAN,
    mapEnable: DataTypes.BOOLEAN,
    appTitle: DataTypes.BOOLEAN,
    homePageTitle: DataTypes.STRING,
    appSubTitle: DataTypes.BOOLEAN,
    appHeader: DataTypes.STRING,
    showCOD: DataTypes.BOOLEAN,
    displayNumber: DataTypes.STRING,
    numberType:DataTypes.STRING,
    ageRistriction: DataTypes.BOOLEAN,
    innoviceAmount: DataTypes.BOOLEAN
    
  }, {});
  featureSettings.associate = function(models) {
    // associations can be defined here
    models.featureSettings.hasMany(models.product,{foreignKey:"settingId"})
    models.featureSettings.hasMany(models.Order,{foreignKey:"settingId"})
  };
  return featureSettings;
};