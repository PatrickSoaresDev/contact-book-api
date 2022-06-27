module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('contacts', 'img_avatar', {
        type: Sequelize.BLOB,
        allowNull: true,
        defaultValue: null,
      }),
    ])
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([queryInterface.removeColumn('contacts', 'img_avatar')])
  },
}
