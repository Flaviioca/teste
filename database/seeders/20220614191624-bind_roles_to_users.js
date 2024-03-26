/* eslint-disable camelcase */
// 'use strict';

const {Role} = require('../../models');

module.exports = {
	// eslint-disable-next-line no-unused-vars
  up: async (queryInterface, Sequelize) => {

    const role_adm = await Role.findOne({where: {name: 'Administrador'} });
    if (role_adm) {
      const role_id = role_adm.id;
      const pattern_role = 'administrador@ceua';
      const sql_role = `UPDATE users SET role_id=${role_id} WHERE email LIKE '${pattern_role}%'`;
      await queryInterface.sequelize.query(sql_role);
    }

    const role_sec = await Role.findOne({where: {name: 'Secretaria'} });
    if (role_sec) {
      const role_id = role_sec.id;
      const pattern_role = 'secretaria@ceua';
      const sql_role = `UPDATE users SET role_id=${role_id} WHERE email LIKE '${pattern_role}%'`;
      await queryInterface.sequelize.query(sql_role);
    }

    const role_rel = await Role.findOne({where: {name: 'Relatoria'} });
    if (role_rel) {
      const role_id = role_rel.id;
      const pattern_role = 'relator';
      const sql_role = `UPDATE users SET role_id=${role_id} WHERE email LIKE '${pattern_role}%'`;
      await queryInterface.sequelize.query(sql_role);
    }

    const role_pes = await Role.findOne({where: {name: 'Pesquisador(a)'} });
    if (role_pes) {
      const role_id = role_pes.id;
      const pattern_role = 'pesquisador';
      const sql_role = `UPDATE users SET role_id=${role_id} WHERE email LIKE '${pattern_role}%'`;
      await queryInterface.sequelize.query(sql_role);
    }

    const role_vet = await Role.findOne({where: {name: 'Veterinário(a)'} });
    if (role_vet) {
      const role_id = role_vet.id;
      const pattern_role = 'veterinario';
      const sql_role = `UPDATE users SET role_id=${role_id} WHERE email LIKE '${pattern_role}%'`;
      await queryInterface.sequelize.query(sql_role);
    }

  },
	// eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    const pattern_email = '@ceua.ufpe.br';
    const sql_raw = `UPDATE users SET role_id=null WHERE email LIKE '%${pattern_email}'`;
    await queryInterface.sequelize.query(sql_raw);
  }
};
