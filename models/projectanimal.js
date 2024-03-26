const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class ProjectAnimal extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			ProjectAnimal.hasMany(models.FarmacoAnimal, {
				foreignKey: 'animal_id',
				as: 'farmaco',
			});
			ProjectAnimal.belongsTo(models.Project, {
				foreignKey: 'project_id',
				as: 'project',
			});
		}
	}
	ProjectAnimal.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			project_id: DataTypes.INTEGER,
			especies: DataTypes.INTEGER,
			especies_outro: DataTypes.TEXT,
			linhagem: DataTypes.TEXT,
			animal_silvestre: DataTypes.INTEGER,
			protocolo_sisbio: DataTypes.TEXT,
			metodo_de_captura: DataTypes.TEXT,
			animal_gm: DataTypes.INTEGER,
			protocolo_ctnbio: DataTypes.TEXT,
			sexo: DataTypes.STRING,
			femeas: DataTypes.STRING,
			machos: DataTypes.STRING,
			idade_inicial: DataTypes.STRING,
			idade_inicial_unidade: DataTypes.STRING,
			idade_final: DataTypes.STRING,
			idade_final_unidade: DataTypes.STRING,
			peso_inicial: DataTypes.STRING,
			peso_inicial_unidade: DataTypes.STRING,
			peso_final: DataTypes.STRING,
			peso_final_unidade: DataTypes.STRING,
			delineamento_experimental: DataTypes.TEXT,
			origem_do_animal: DataTypes.STRING,
			origem_do_animal_outros: DataTypes.STRING,
			destino_do_animal: DataTypes.STRING,
			destino_do_animal_outros: DataTypes.STRING,
			instalacao: DataTypes.STRING,
			instalacao_outro: DataTypes.STRING,
			dimensoes: DataTypes.STRING,
			alimentacao: DataTypes.STRING,
			fonte_de_agua: DataTypes.STRING,
			exaustao_de_ar: DataTypes.STRING,
			numero_de_animais_por_alojamento: DataTypes.STRING,
			tipo_de_cama: DataTypes.STRING,
			tipo_de_cama_outro: DataTypes.STRING,
			stresse_animal: DataTypes.STRING,
			stresse_detalhe: DataTypes.STRING,
			stresse_animal_outro: DataTypes.STRING,
			dor: DataTypes.STRING,
			dor_justificativa: DataTypes.STRING,
			famarco_analgesico: DataTypes.STRING,
			n_analgesico_justificativa: DataTypes.STRING,
			imobilizacao: DataTypes.STRING,
			imobilizacao_justificativa: DataTypes.STRING,
			condicoes_alimentares: DataTypes.STRING,
			condicoes_alimentares_tempo: DataTypes.STRING,
			condicoes_alimentares_detalhe: DataTypes.STRING,
			restricao_hidrica: DataTypes.STRING,
			restricao_hidrica_tempo: DataTypes.STRING,
			restricao_hidrica_detalhe: DataTypes.STRING,
			descricao: DataTypes.TEXT,
			sdv: DataTypes.TEXT,
			cmr: DataTypes.TEXT,
			ddaae: DataTypes.TEXT,
			fdddc: DataTypes.TEXT,
			exposicao: DataTypes.TEXT,
			exposicao_justificativa: DataTypes.TEXT,
			cirurgia: DataTypes.TEXT,
			cirurgia_justificativa: DataTypes.TEXT,
			anestesico: DataTypes.TEXT,
			anestesico_justificativa: DataTypes.TEXT,
			createdAt: {
				type: DataTypes.DATE,
				field: 'created_at',
			},
			updatedAt: {
				type: DataTypes.DATE,
				field: 'updated_at',
			},
		},
		{
			sequelize,
			tableName: 'project_animals',
			modelName: 'ProjectAnimal',
		}
	);
	return ProjectAnimal;
};
