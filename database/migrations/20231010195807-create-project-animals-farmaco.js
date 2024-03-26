'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('project_animal_farmacos', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			animal_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'project_animals',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			farmaco_tipo_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'farmaco_tipo',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			nome: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			via_administracao: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			dose_unidade: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			frequencia: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				field: 'created_at',
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				field: 'updated_at',
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('farmaco_animals');
	},
};
