const {vinculos} = require('./index');

const vinculosMembros = [
	...vinculos,
	{
		id: 5,
		nome: 'Discente Graduação',
	},
	{
		id: 6,
		nome: 'Discente Pós – graduação',
	},
];

module.exports = {
	vinculosMembros,
};
