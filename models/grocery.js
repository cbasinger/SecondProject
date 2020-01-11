'use strict';
module.exports = (sequelize, DataTypes) => {
  const grocery = sequelize.define('grocery', {
    groceryitem: DataTypes.STRING
  }, {});
  grocery.associate = function(models) {
    // associations can be defined here
  };
  return grocery;
};