// 'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'role_id', {
      allowNull: true,
      type: Sequelize.INTEGER,
      // after: "state", // Funciona apenas com MySQL
    });

  },
  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'role_id', {});
  }
};
