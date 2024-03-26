// 'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('roles', 'slug', {
      allowNull: true,
      type: Sequelize.STRING,
      // after: "state", // Funciona apenas com MySQL
    });
  },
  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('roles', 'slug', {});
  }
};
