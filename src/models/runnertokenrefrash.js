'use strict';
module.exports = (sequelize, DataTypes) => {
  const Runnertokenrefrash = sequelize.define('Runnertokenrefrash', {
    runnerRefreshTokens: DataTypes.STRING,
    runnerId:  DataTypes.UUID
  }, {});
  Runnertokenrefrash.associate = function(models) {
    // associations can be defined here
    models.Runnertokenrefrash.belongsTo(models.RunnerAuth ,{foreignkey:"runnerId"})
  };
  return Runnertokenrefrash;
};