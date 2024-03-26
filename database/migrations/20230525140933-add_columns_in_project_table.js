const {
  Sequelize
} = require('sequelize');

const table = 'projects';
const fields = [
	{
		name: 'state',
		options: {
			allowNull: false,
			defaultValue: 0,
			type: Sequelize.INTEGER,
		},
	},
	{
		name: 'duracao_da_pesquisa',
		options: {
			allowNull: true,
			type: Sequelize.STRING,
		},
	},
	{
		name: 'date_start',
		options: {
			allowNull: true,
			type: Sequelize.DATEONLY,
		},
	},
	{
		name: 'date_end',
		options: {
			allowNull: true,
			type: Sequelize.DATEONLY,
		},
	},
	{
		name: 'sub_area',
		options: {
			allowNull: true,
			type: Sequelize.INTEGER,
		},
	},
	{
		name: 'sub_area_descricao',
		options: {
			allowNull: true,
			type: Sequelize.STRING,
		},
	},
	{
		name: 'patente',
		options: {
			allowNull: true,
			type: Sequelize.INTEGER,
		},
	},
	{
		name: 'financiador',
		options: {
			allowNull: true,
			type: Sequelize.INTEGER,
		},
	},
	{
		name: 'financiador_nome',
		options: {
			allowNull: true,
			type: Sequelize.STRING,
		},
	},
	{
		name: 'chefe',
		options: {
			allowNull: true,
			type: Sequelize.STRING,
		},
	},
	{
		name: 'chefe_email',
		options: {
			allowNull: true,
			type: Sequelize.STRING,
		},
	},
	{
		name: 'resumo',
		options: {
			allowNull: true,
			type: Sequelize.TEXT,
		},
	},
	{
		name: 'objetivos',
		options: {
			allowNull: true,
			type: Sequelize.TEXT,
		},
	},
	{
		name: 'justificativa',
		options: {
			allowNull: true,
			type: Sequelize.TEXT,
		},
	},
	{
		name: 'relevancia',
		options: {
			allowNull: true,
			type: Sequelize.TEXT,
		},
	},
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // eslint-disable-next-line no-unused-vars
  async up (queryInterface, _Sequelize) {
		fields.forEach(async (elem) => {
			await queryInterface.addColumn(table, elem.name, elem.options);
		});
  },

	// eslint-disable-next-line no-unused-vars
  async down (queryInterface, _Sequelize) {
    fields.forEach(async (elem) => {
			await queryInterface.removeColumn(table, elem.name, {});
		});
  }
};
