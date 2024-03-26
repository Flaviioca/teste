/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			'projects',
			{
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				uuid: {
					allowNull: false,
					type: Sequelize.STRING,
				},
				// parecerista_uuid: {
				// 	allowNull: true,
				// 	type: Sequelize.STRING,
				// },
				title_pt_br: {
					allowNull: false,
					type: Sequelize.STRING,
				},
				title_en: {
					allowNull: false,
					type: Sequelize.STRING,
				},
				reason: {
					allowNull: false,
					type: Sequelize.INTEGER,
				},
				user_id: {
					allowNull: false,
					type: Sequelize.INTEGER,
				},
				createdAt: {
					allowNull: false,
					field: 'created_at',
					type: Sequelize.DATE,
					defaultValue: Sequelize.fn('now'),
				},
				updatedAt: {
					allowNull: false,
					field: 'updated_at',
					type: Sequelize.DATE,
					defaultValue: Sequelize.fn('now'),
				},
				updatedBy: {
					allowNull: false,
					field: 'updated_by',
					type: Sequelize.INTEGER,
				},
			},
			{
				indexes: [
					{
						unique: true,
						fields: ['uuid'],
					},
				],
			}
		);
	},
	// eslint-disable-next-line no-unused-vars
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('projects');
	},
};
