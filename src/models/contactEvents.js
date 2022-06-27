'use strict'
module.exports = (sequelize, DataTypes) => {
  const ContactEvents = sequelize.define(
    'contact_events',
    {
      event_id: DataTypes.INTEGER,
      contact_id: DataTypes.INTEGER,
    },
    {
      freezeTableName: true,
    }
  )
  return ContactEvents
}
