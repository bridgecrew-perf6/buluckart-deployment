'use strict';
module.exports = (sequelize, DataTypes) => {
  const location = sequelize.define('location', {
    name: DataTypes.STRING,
    status: DataTypes.INTEGER,
    zipcode: DataTypes.INTEGER,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    hex: DataTypes.STRING,
    mapUrl: DataTypes.STRING

  }, {});
  location.associate = function(models) {
    // associations can be defined here
    models.location.hasMany(models.area, { foreignKey: 'locationId' });

  };
  return location;
};