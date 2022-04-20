'use strict';
module.exports = (sequelize, DataTypes) => {
  const citySettings = sequelize.define('citySettings', {
    City: DataTypes.STRING
  }, {});
  citySettings.associate = function(models) {
    // associations can be defined here
  };
  return citySettings;
};