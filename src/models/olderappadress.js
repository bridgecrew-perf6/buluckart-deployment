'use strict';
module.exports = (sequelize, DataTypes) => {
  const olderAppAdress = sequelize.define('olderAppAdress', {
   adresss: DataTypes.STRING,
   custId: DataTypes.INTEGER 
  }, {});
  olderAppAdress.associate = function(models) {
    // associations can be defined here
    models.olderAppAdress.belongsTo(models.customerModel, { foreignKey: 'custId' }); 
  };
  return olderAppAdress;
};