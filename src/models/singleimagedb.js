'use strict';
module.exports = (sequelize, DataTypes) => {
  const singleimagedb = sequelize.define('singleimagedb', {
    photo: DataTypes.STRING
  }, {});
  singleimagedb.associate = function(models) {
    // associations can be defined here
  };
  return singleimagedb;
};