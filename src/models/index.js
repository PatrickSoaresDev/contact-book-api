require('dotenv').config()
const Sequelize = require('sequelize')
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    operatorsAliases: 0,
    logging: false,
    pool: {
      max: +process.env.DB_POOL_MAX,
      min: +process.env.DB_POOL_MIN,
      acquire: 3000,
      idle: 10000,
    },
  }
)
const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.contact = require('./contacts')(sequelize, Sequelize)
db.events = require('./events')(sequelize, Sequelize)
db.contactEvents = require('./contactEvents')(sequelize, Sequelize)

Contacts = db.contact
Events = db.events

Events.belongsToMany(Contacts, {
  through: 'contact_events',
  as: 'contacts',
  foreignKey: 'event_id',
})

Contacts.belongsToMany(Events, {
  through: 'contact_events',
  as: 'events',
  foreignKey: 'contact_id',
})

module.exports = db
