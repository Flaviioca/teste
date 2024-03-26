/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('users', 'phone', {
      allowNull: true,
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('users', 'telefone', {
      allowNull: true,
      type: Sequelize.STRING
    });

    await queryInterface.addColumn('users', 'doc', {
      allowNull: true,
      type: Sequelize.STRING,
      // after: "state", // Funciona apenas com MySQL
    });
    await queryInterface.addColumn('users', 'university', {
      allowNull: true,
      type: Sequelize.INTEGER,
    });
    await queryInterface.addColumn('users', 'campus', {
      allowNull: true,
      type: Sequelize.STRING,
      // after: "state", // Funciona apenas com MySQL
    });
    await queryInterface.addColumn('users', 'area_de_atuacao', {
      allowNull: true,
      type: Sequelize.STRING,
      // after: "state", // Funciona apenas com MySQL
    });
    await queryInterface.addColumn('users', 'lattes', {
      allowNull: true,
      type: Sequelize.STRING,
      // after: "state", // Funciona apenas com MySQL
    });
    await queryInterface.addColumn('users', 'vinculo', {
      allowNull: true,
      type: Sequelize.INTEGER,
      // after: "state", // Funciona apenas com MySQL
    });

    await queryInterface.addColumn('users', 'experiencia', {
      allowNull: true,
      type: Sequelize.STRING,
      // after: "state", // Funciona apenas com MySQL
    });
    await queryInterface.addColumn('users', 'experiencia_tempo', {
      allowNull: true,
      type: Sequelize.STRING,
      // after: "state", // Funciona apenas com MySQL
    });

    await queryInterface.addColumn('users', 'experiencia_unidade', {
      allowNull: true,
      type: Sequelize.STRING,
      // after: "state", // Funciona apenas com MySQL
    });
    await queryInterface.addColumn('users', 'treinamento', {
      allowNull: true,
      type: Sequelize.STRING,
      // after: "state", // Funciona apenas com MySQL
    });
    await queryInterface.addColumn('users', 'treinamento_tempo', {
      allowNull: true,
      type: Sequelize.STRING,
      // after: "state", // Funciona apenas com MySQL
    });
    await queryInterface.addColumn('users', 'treinamento_unidade', {
      allowNull: true,
      type: Sequelize.STRING,
      // after: "state", // Funciona apenas com MySQL
    });
    await queryInterface.addColumn('users', 'certificado_treinamento', {
      allowNull: true,
      type: Sequelize.STRING,
      // after: "state", // Funciona apenas com MySQL
    });
  },

  // eslint-disable-next-line no-unused-vars
  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('users', 'phone', {});
    await queryInterface.removeColumn('users', 'telefone', {});
    await queryInterface.removeColumn('users', 'doc', {});
    await queryInterface.removeColumn('users', 'university', {});
    await queryInterface.removeColumn('users', 'campus', {});
    await queryInterface.removeColumn('users', 'area_de_atuacao', {});
    await queryInterface.removeColumn('users', 'lattes', {});
    await queryInterface.removeColumn('users', 'vinculo', {});
		await queryInterface.removeColumn('users', 'experiencia', {});
		await queryInterface.removeColumn('users', 'experiencia_tempo', {});
		await queryInterface.removeColumn('users', 'experiencia_unidade', {});
		await queryInterface.removeColumn('users', 'treinamento', {});
		await queryInterface.removeColumn('users', 'treinamento_tempo', {});
		await queryInterface.removeColumn('users', 'treinamento_unidade', {});
		await queryInterface.removeColumn('users', 'certificado_treinamento', {});
  }
};
