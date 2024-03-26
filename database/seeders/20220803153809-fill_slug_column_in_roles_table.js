





/* eslint-disable camelcase */
// 'use strict';

const { Role } = require('../../models');

const tableName = 'roles';

module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: async (queryInterface, Sequelize) => {
    // Trocar o perfil de "Pesquisador(a)" para "Relatoria" e vice-versa
    const role_pes = await Role.findOne({ where: { name: 'Pesquisador(a)' } });
    const role_rel = await Role.findOne({ where: { name: 'Relatoria' } });

    if (role_pes && role_rel) {
      const role_pes_id = role_pes.id;
      const role_rel_id = role_rel.id;

      const current_slug_pes = 'researcher';
      const new_slug_pes = 'reporter';
      const sql_role_pes = `UPDATE ${tableName} SET slug='${new_slug_pes}' WHERE id='${role_pes_id}' AND slug='${current_slug_pes}'`;
      await queryInterface.sequelize.query(sql_role_pes);

      const current_slug_rel = 'reporter';
      const new_slug_rel = 'researcher';
      const sql_role_rel = `UPDATE ${tableName} SET slug='${new_slug_rel}' WHERE id='${role_rel_id}' AND slug='${current_slug_rel}'`;
      await queryInterface.sequelize.query(sql_role_rel);
    }

    // Manter os outros perfis inalterados (Admin, Secretaria, Vet)
    const role_adm = await Role.findOne({where: {name: 'Administrador'} });
    if (role_adm) {
      const role_id = role_adm.id;
      const slug = 'admin';
      const sql_role = `UPDATE ${tableName} SET slug='${slug}' WHERE id='${role_id}'`;
      await queryInterface.sequelize.query(sql_role);
    }

    const role_sec = await Role.findOne({where: {name: 'Secretaria'} });
    if (role_sec) {
      const role_id = role_sec.id;
      const slug = 'secretary';
      const sql_role = `UPDATE ${tableName} SET slug='${slug}' WHERE id='${role_id}'`;
      await queryInterface.sequelize.query(sql_role);
    }
    // ...

    
    const role_vet = await Role.findOne({where: {name: 'Veterinário(a)'} });
    if (role_vet) {
      const role_id = role_vet.id;
      const slug = 'vet';
      const sql_role = `UPDATE ${tableName} SET slug='${slug}' WHERE id='${role_id}'`;
      await queryInterface.sequelize.query(sql_role);
    }
  },
  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    const sql_role = `UPDATE ${tableName} SET slug=''`;
    await queryInterface.sequelize.query(sql_role);
  }
};
