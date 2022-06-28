'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('contact_events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      event_id: {
        type: Sequelize.INTEGER,
        references: { model: 'events', key: 'id' },
        onDelete: 'Cascade',
        allowNull: false,
      },
      contact_id: {
        type: Sequelize.INTEGER,
        references: { model: 'contacts', key: 'id' },
        onDelete: 'Cascade',
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('contact_events')
  },
}
