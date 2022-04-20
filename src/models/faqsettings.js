'use strict';
module.exports = (sequelize, DataTypes) => {
  const faqSettings = sequelize.define('faqSettings', {
    Category : DataTypes.STRING,
    Question  : DataTypes.STRING,
    AnswerText : DataTypes.TEXT,
   }, {});
  faqSettings.associate = function(models) {
    // associations can be defined here
  };
  return faqSettings;
};