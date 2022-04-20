'use strict';
module.exports = (sequelize, DataTypes) => {
  const alertMsgModel = sequelize.define('alertMsgModel', {
    title: DataTypes.STRING,
    alerttext: DataTypes.STRING,
    pushstatus: DataTypes.BOOLEAN,
    clients: DataTypes.STRING,
    reason: DataTypes.STRING,
    message: DataTypes.TEXT,
  }, {});
  alertMsgModel.associate = function(models) {
    // associations can be defined here
  };
  return alertMsgModel;
};