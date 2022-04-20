'use strict';
module.exports = (sequelize, DataTypes) => {
  const refreshSchema = sequelize.define('refreshSchema', {
    tokens: DataTypes.STRING,
    custId: DataTypes.UUID
  }, {});
  refreshSchema.associate = function(models) {
     models.refreshSchema.belongsTo(models.customerModel, { foreignKey: 'custId' });
  }
  return refreshSchema;
};

