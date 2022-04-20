'use strict';
module.exports = (sequelize, DataTypes) => {
  const tagModel = sequelize.define('tagModel', {
    Name: DataTypes.STRING,
    productId: DataTypes.INTEGER,
  }, {});
  tagModel.associate = function(models) {
    // associations can be defined here
      models.tagModel.belongsTo(models.product, { foreignKey: 'productId' });
  };
  return tagModel;
};