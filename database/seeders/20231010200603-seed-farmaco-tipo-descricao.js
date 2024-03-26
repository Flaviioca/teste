'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const medications = [
			{
				nome: 'Analgésicos',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				nome: 'Antibióticos',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				nome: 'Antivirais',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				nome: 'Anti-inflamatórios',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				nome: 'Antidepressivos',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				nome: 'Antipsicóticos',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				nome: 'Anti-hipertensivos',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				nome: 'Anticoagulantes',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				nome: 'Anticoncepcionais',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				nome: 'Diuréticos',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				nome: 'Quimioterápicos',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				nome: 'Imunossupressores',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				nome: 'Antieméticos',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				nome: 'Agentes hipoglicemiantes',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				nome: 'Medicamentos para distúrbios do sono',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				nome: 'Agentes broncodilatadores',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				nome: 'Agentes antiepilépticos',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				nome: 'Hormônios',
				created_at: new Date(),
				updated_at: new Date(),
			},
		];

		await queryInterface.bulkInsert('farmaco_tipo', medications, {});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('farmaco_tipo', null, {});
	},
};
