const table = 'project_animals';
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
      especies: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      especies_outro: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      linhagem: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      animal_silvestre: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      protocolo_sisbio: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      metodo_de_captura: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      animal_gm: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      protocolo_ctnbio: {
        allowNull: true,
        type: Sequelize.TEXT
      },
    sexo: {
      allowNull: true,
      type: Sequelize.STRING
    },
    femeas: {
      allowNull: true,
      type: Sequelize.STRING
    },
      machos: {
        allowNull: true,
        type: Sequelize.STRING
      },
      idade_inicial: {
        allowNull: true,
        type: Sequelize.STRING
      },
      idade_inicial_unidade: {
        allowNull: true,
        type: Sequelize.STRING
      },
      idade_final: {
        allowNull: true,
        type: Sequelize.STRING
      },
      idade_final_unidade: {
        allowNull: true,
        type: Sequelize.STRING
      },
      peso_inicial: {
        allowNull: true,
        type: Sequelize.STRING
      },
      peso_inicial_unidade: {
        allowNull: true,
        type: Sequelize.STRING
      },
      peso_final: {
        allowNull: true,
        type: Sequelize.STRING
      },
      peso_final_unidade: {
        allowNull: true,
        type: Sequelize.STRING
      },
    
      delineamento_experimental: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      origem_do_animal: {
        allowNull: false,
        type: Sequelize.STRING
      },
      origem_do_animal_outros: {
        allowNull: false,
        type: Sequelize.STRING
      },
      destino_do_animal: {
        allowNull: false,
        type: Sequelize.STRING
      },
      destino_do_animal_outros: {
        allowNull: false,
        type: Sequelize.STRING
      },
      instalacao: {
        allowNull: false,
        type: Sequelize.STRING
      },
      instalacao_outro: {
        allowNull: false,
        type: Sequelize.STRING
      },
      dimensoes: {
        allowNull: false,
        type: Sequelize.STRING
      },
      alimentacao: {
        allowNull: false,
        type: Sequelize.STRING
      },
      fonte_de_agua: {
        allowNull: false,
        type: Sequelize.STRING
      },
      exaustao_de_ar: {
        allowNull: false,
        type: Sequelize.STRING
      },
      numero_de_animais_por_alojamento: {
        allowNull: false,
        type: Sequelize.STRING
      },
      tipo_de_cama: {
        allowNull: false,
        type: Sequelize.STRING
      },
      tipo_de_cama_outro: {
        allowNull: false,
        type: Sequelize.STRING
      },

      stresse_animal: {
        allowNull: false,
        type: Sequelize.STRING
      },
      stresse_detalhe: {
        allowNull: false,
        type: Sequelize.STRING
      },
      stresse_animal_outro: {
        allowNull: false,
        type: Sequelize.STRING
      },
      dor: {
        allowNull: false,
        type: Sequelize.STRING
      },
      dor_justificativa: {
        allowNull: false,
        type: Sequelize.STRING
      },
      famarco_analgesico: {
        allowNull: false,
        type: Sequelize.STRING
      },
      n_analgesico_justificativa: {
        allowNull: false,
        type: Sequelize.STRING
      },
     
      imobilizacao: {
        allowNull: false,
        type: Sequelize.STRING
      },
      imobilizacao_justificativa: {
        allowNull: false,
        type: Sequelize.STRING
      },
      condicoes_alimentares: {
        allowNull: false,
        type: Sequelize.STRING
      },
      condicoes_alimentares_tempo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      condicoes_alimentares_detalhe: {
        allowNull: false,
        type: Sequelize.STRING
      },
      restricao_hidrica: {
        allowNull: false,
        type: Sequelize.STRING
      },
      restricao_hidrica_tempo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      restricao_hidrica_detalhe: {
        allowNull: false,
        type: Sequelize.STRING
      },
     




      descricao: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      sdv: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      cmr: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      ddaae: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      fdddc: {
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
