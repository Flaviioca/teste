const table = 'project_owners';

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
        allowNull: false,
        type: Sequelize.STRING
      },
			doc: {
        allowNull: true,
        type: Sequelize.STRING
      },
			doc_type: {
        allowNull: true,
        type: Sequelize.STRING
      },
			phone: {
        allowNull: true,
        type: Sequelize.STRING
      },
			cellphone: {
        allowNull: true,
        type: Sequelize.STRING
      },
			university: {
				allowNull: true,
        type: Sequelize.INTEGER
			},
			university_name: {
				allowNull: true,
        type: Sequelize.STRING
			},
			campus: {
        allowNull: true,
        type: Sequelize.STRING
      },
			area_de_atuacao: {
				allowNull: true,
        type: Sequelize.STRING
			},
			lattes: {
				allowNull: true,
        type: Sequelize.STRING
			},
			vinculo: {
				allowNull: true,
        type: Sequelize.INTEGER
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
			treinamento_certificado: {
				allowNull: true,
        type: Sequelize.STRING
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
