// 'use strict';

const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const {User} = require('../../models');

const tableName = 'users';
const hashedPassword = bcrypt.hashSync('12345678', 5);
const agora = new Date();

const users = [
  {
    uuid: crypto.randomUUID(),
    name: "Administrador",
    password: hashedPassword,
    email: "administrador@ceua.ufpe.br",
    email_verified_at: agora,
    state: 1,
    created_at: agora,
    updated_at: agora,
  },
  {
    uuid: crypto.randomUUID(),
    name: "Secretária",
    password: hashedPassword,
    email: "secretaria@ceua.ufpe.br",
    email_verified_at: agora,
    state: 1,
    created_at: agora,
    updated_at: agora,
  },
  {
    uuid: crypto.randomUUID(),
    name: "Relator 1",
    password: hashedPassword,
    email: "relator1@ceua.ufpe.br",
    email_verified_at: agora,
    state: 1,
    created_at: agora,
    updated_at: agora,
  },
  {
    uuid: crypto.randomUUID(),
    name: "Relator 2",
    password: hashedPassword,
    email: "relator2@ceua.ufpe.br",
    email_verified_at: agora,
    state: 1,
    created_at: agora,
    updated_at: agora,
  },
  {
    uuid: crypto.randomUUID(),
    name: "Relator Convidado",
    password: '',
    email: "relator3@ceua.ufpe.br",
    state: 0,
    created_at: agora,
    updated_at: agora,
  },
  {
    uuid: crypto.randomUUID(),
    name: "Pesquisador 1",
    password: hashedPassword,
    email: "pesquisador1@ceua.ufpe.br",
    email_verified_at: agora,
    state: 1,
    created_at: agora,
    updated_at: agora,
  },
  {
    uuid: crypto.randomUUID(),
    name: "Pesquisador 2",
    password: hashedPassword,
    email: "pesquisador2@ceua.ufpe.br",
    email_verified_at: agora,
    state: 1,
    created_at: agora,
    updated_at: agora,
  },
  {
    uuid: crypto.randomUUID(),
    name: "Pesquisador Não confirmado",
    password: '',
    email: "pesquisador3@ceua.ufpe.br",
    state: 0,
    created_at: agora,
    updated_at: agora,
  },
  {
    uuid: crypto.randomUUID(),
    name: "Veterinário 1",
    password: hashedPassword,
    email: "veterinario1@ceua.ufpe.br",
    email_verified_at: agora,
    state: 1,
    created_at: agora,
    updated_at: agora,
  },
  {
    uuid: crypto.randomUUID(),
    name: "Veterinário 2",
    password: '',
    email: "veterinario2@ceua.ufpe.br",
    state: 0,
    created_at: agora,
    updated_at: agora,
  },
];

module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const count = await User.count().then(c => c);
    if (count === 0 ) {
      await queryInterface.bulkInsert(tableName, users);
    }
  },
	// eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete(tableName, null, {});
  }
};
