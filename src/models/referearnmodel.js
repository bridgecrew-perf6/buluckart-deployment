'use strict';
module.exports = (sequelize, DataTypes) => {
  const referEarnModel = sequelize.define('referEarnModel', {
    discount: DataTypes.INTEGER,
    DaysValidity: DataTypes.INTEGER,
    Message: DataTypes.TEXT,
    Notification: DataTypes.TEXT,
    status: DataTypes.BOOLEAN

  }, {});
  referEarnModel.associate = function(models) {
    // associations can be defined here
  };
  return referEarnModel;
};