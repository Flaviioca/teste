'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.sequelize.transaction((t) => {
			return Promise.all([
				queryInterface.addColumn(
					'project_animals',
					'anestesico',
					{
						type: Sequelize.DataTypes.STRING,
					},
					{ transaction: t }
				),
				queryInterface.addColumn(
					'project_animals',
					'anestesico_justificativa',
					{
						type: Sequelize.DataTypes.STRING,
					},
					{ transaction: t }
				),
			]);
		});
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.sequelize.transaction((t) => {
			return Promise.all([
				queryInterface.removeColumn('project_animals', 'cirurgia', {
					transaction: t,
				}),
				queryInterface.removeColumn(
					'project_animals',
					'cirurgia_justificativa',
					{ transaction: t }
				),
				queryInterface.removeColumn('project_animals', 'anestesico', {
					transaction: t,
				}),
				queryInterface.removeColumn(
					'project_animals',
					'anestesico_justificativa',
					{ transaction: t }
				),
			]);
		});
	},
};
