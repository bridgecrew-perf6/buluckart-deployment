'use strict';
module.exports = (sequelize, DataTypes) => {
  const pageSettings = sequelize.define('pageSettings', {
    Page : DataTypes.STRING,
    Message : DataTypes.TEXT
  }, {});
  pageSettings.associate = function(models) {
    // associations can be defined here
  };
  return pageSettings;
};
