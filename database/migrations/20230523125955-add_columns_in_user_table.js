

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

		await queryInterface.addColumn('users', 'tipo_doc', {
      allowNull: true,
      type: Sequelize.STRING,
      // after: "state", // Funciona apenas com MySQL
    });
  },

	// eslint-disable-next-line no-unused-vars
  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'tipo_doc', {});
  }
};
