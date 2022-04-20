'use strict';
module.exports = (sequelize, DataTypes) => {
  const enquiryModel = sequelize.define('enquiryModel', {
    plateform: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneno: DataTypes.INTEGER,
    Message: DataTypes.TEXT
           
  }, {});
  enquiryModel.associate = function(models) {
    // associations can be defined here
  };
  return enquiryModel;
};