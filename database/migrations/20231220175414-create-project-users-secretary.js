/** @type {import('sequelize-cli').Migration} */
// Example migration file (timestamp will vary)

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('justificativa', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			projectId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'projects',
					key: 'id',
				},
			},
			userId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'users',
					key: 'id',
				},
			},
			justificativa_texto: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('justificativa');
	},
};
