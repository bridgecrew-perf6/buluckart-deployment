'use strict';
module.exports = (sequelize, DataTypes) => {
  const storeInformationSettings = sequelize.define('storeInformationSettings', {
    StoreName: DataTypes.STRING,
    StoreContactPerson : DataTypes.STRING,
    StoreContactNumber: DataTypes.INTEGER,
    StoreEmail: DataTypes.STRING,
    Location: DataTypes.STRING,
    City : DataTypes.STRING,
    State: DataTypes.STRING,
    Country : DataTypes.STRING,
    Timezone : DataTypes.STRING,
    Zipcode : DataTypes.INTEGER,
    Currency : DataTypes.STRING,
    AppShareLink : DataTypes.STRING,
    AndroidShareLink : DataTypes.STRING,
    phoneShareLink : DataTypes.STRING,
    ShowCurrency : DataTypes.STRING,
    UploadStoreLogo : DataTypes.STRING,
    photoUrl : DataTypes.STRING,
    AboutUs : DataTypes.STRING
  }, {});
  storeInformationSettings.associate = function(models) {
    // associations can be defined here
  };
  return storeInformationSettings;
};