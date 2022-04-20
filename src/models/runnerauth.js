'use strict';
module.exports = (sequelize, DataTypes) => {
  const RunnerAuth = sequelize.define('RunnerAuth', {
    Name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    avatar: DataTypes.STRING,
    status: DataTypes.STRING,
    gender: DataTypes.STRING,
    area: DataTypes.STRING,
    activated:{
       type:DataTypes.BOOLEAN,
       default :false
    },
  }, {});
  RunnerAuth.associate = function(models) {
    // associations can be defined here
    models.RunnerAuth.hasMany(models.Runnertokenrefrash ,{foreignkey:"runnerId"})
  };
  return RunnerAuth;
};

