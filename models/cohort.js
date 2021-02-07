'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cohort extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cohort.hasMany(models.Meeting);
    }
  };
  Cohort.init({
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    startsOn: DataTypes.DATEONLY,
    endsOn: DataTypes.DATEONLY,
    desc: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Cohort',
  });
  return Cohort;
};