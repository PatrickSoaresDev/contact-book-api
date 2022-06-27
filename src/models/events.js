'use strict'
module.exports = (sequelize, DataTypes) => {
  const Events = sequelize.define(
    'events',
    {
      name: DataTypes.STRING,
      date: DataTypes.DATE,
    },
    {}
  )
  return Events
}
