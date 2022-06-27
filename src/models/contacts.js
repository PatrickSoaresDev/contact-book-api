'use strict'
module.exports = (sequelize, DataTypes) => {
  const Contacts = sequelize.define(
    'contact',
    {
      name: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {}
  )

  return Contacts
}
