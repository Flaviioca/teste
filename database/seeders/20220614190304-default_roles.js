const crypto = require('crypto');
const {Role} = require('../../models');

const tableName = 'roles';
const agora = new Date();

const roles = [
  {
    uuid: crypto.randomUUID(),
    name: 'Administrador',
    description: 'Administrador do sistema',
    created_at: agora,
    updated_at: agora,
  },
  {
    uuid: crypto.randomUUID(),
    name: 'Secretaria',
    description: 'Secretariado do sistema',
    created_at: agora,
    updated_at: agora,
  },
  {
    uuid: crypto.randomUUID(),
    name: 'Relatoria',
    description: 'Relatoria do sistema',
    created_at: agora,
    updated_at: agora,
  },
  {
    uuid: crypto.randomUUID(),
    name: 'Pesquisador(a)',
    description: 'Pesquisadores do sistema',
    created_at: agora,
    updated_at: agora,
  },
  {
    uuid: crypto.randomUUID(),
    name: 'Veterinário(a)',
    description: 'Responsáveis por biotério do sistema',
    created_at: agora,
    updated_at: agora,
  },
];

module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: async (queryInterface, Sequelize) => {
    const count = await Role.count().then(c => c);
    if (count === 0 ) {
      await queryInterface.bulkInsert(tableName, roles);
    }
  },
	// eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(tableName, null, {});
  }
};
