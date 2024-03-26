/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.addColumn(
			'projects', // nome da tabela
			'parecerista_uuid', // nome do novo campo
			{
				type: Sequelize.STRING,
				allowNull: true,
			}
		);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.removeColumn(
			'projects', // nome da tabela
			'parecerista_uuid' // nome do campo a ser removido
		);
	},
};
