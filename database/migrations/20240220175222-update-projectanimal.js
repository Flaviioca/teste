'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.sequelize.transaction((t) => {
			return Promise.all([
				queryInterface.addColumn(
					'project_animals',
					'exposicao',
					{
						type: Sequelize.DataTypes.STRING,
					},
					{ transaction: t }
				),
				queryInterface.addColumn(
					'project_animals',
					'exposicao_justificativa',
					{
						type: Sequelize.DataTypes.STRING,
					},
					{ transaction: t }
				),
			]);
		});
	},

	async down(queryInterface, _Sequelize) {
		return queryInterface.sequelize.transaction((t) => {
			return Promise.all([
				queryInterface.removeColumn('project_animals', 'exposicao', {
					transaction: t,
				}),
				queryInterface.removeColumn(
					'project_animals',
					'exposicao_justificativa',
					{ transaction: t }
				),
			]);
		});
	},
};
