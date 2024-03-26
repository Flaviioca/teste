const table = 'project_members';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(table, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      project_id: {
        type: Sequelize.INTEGER
      },
      name: {
				allowNull: false,
        type: Sequelize.STRING
      },
			email: {
				allowNull: true,
        type: Sequelize.STRING
      },
      doc_type: {
				allowNull: false,
        type: Sequelize.STRING
      },
      doc: {
				allowNull: false,
        type: Sequelize.STRING
      },
			vinculo: {
				allowNull: true,
        type: Sequelize.STRING
      },
			university: {
				allowNull: true,
        type: Sequelize.STRING
      },
			campus: {
				allowNull: true,
        type: Sequelize.STRING
      },
			departamento: {
				allowNull: true,
        type: Sequelize.STRING
      },
			lattes_url: {
				allowNull: true,
        type: Sequelize.STRING
      },
			experiencia: {
				allowNull: true,
        type: Sequelize.STRING
      },
			experiencia_tempo: {
				allowNull: true,
        type: Sequelize.STRING
      },
			experiencia_unidade: {
				allowNull: true,
        type: Sequelize.STRING
      },
			treinamento: {
				allowNull: true,
        type: Sequelize.STRING
      },
			treinamento_tempo: {
				allowNull: true,
        type: Sequelize.STRING
      },
			treinamento_unidade: {
				allowNull: true,
        type: Sequelize.STRING
      },
			certificado_treinamento: {
				allowNull: true,
        type: Sequelize.STRING
      },
			observacoes: {
				allowNull: true,
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        field: 'created_at',
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        field: 'updated_at',
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      }
    });
  },
  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(table);
  }
};
