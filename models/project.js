const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Project extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		// eslint-disable-next-line no-unused-vars
		static associate(models) {
			Project.hasOne(models.ProjectOwner, {
				foreignKey: 'project_id',
				as: 'owner',
			});
			Project.belongsTo(models.User, {
				foreignKey: 'user_id',
				as: 'user',
			});
			Project.belongsTo(models.User, {
				foreignKey: 'user_id',
				as: 'parecerista',
			});
			Project.hasMany(models.ProjectMember, {
				foreignKey: 'project_id',
				as: 'members',
			});
			Project.hasMany(models.ProjectAnimal, {
				foreignKey: 'project_id',
				as: 'animals',
			});
			Project.hasOne(models.ProjectInvasividade, {
				foreignKey: 'project_id',
				as: 'invasividade',
			});
			Project.belongsToMany(models.User, {
				through: 'project_users',
				foreignKey: 'projectId',
				otherKey: 'userId',
				as: 'users',
			});
			Project.hasMany(models.justificativa, {
				foreignKey: 'projectId',
				as: 'justificativas',
			});
			Project.belongsTo(models.File, {
				foreignKey: 'file_id',
				as: 'file',
			});
		}
	}
	Project.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			uuid: DataTypes.STRING,
			parecerista_uuid: DataTypes.STRING,
			title_pt_br: DataTypes.STRING,
			title_en: DataTypes.STRING,
			state: DataTypes.INTEGER,
			reason: DataTypes.INTEGER,
			duracao_da_pesquisa: DataTypes.STRING,
			date_start: DataTypes.DATE,
			date_end: DataTypes.DATE,
			user_id: DataTypes.INTEGER,
			sub_area: DataTypes.INTEGER,
			sub_area_descricao: DataTypes.STRING,
			patente: DataTypes.INTEGER,
			financiador: DataTypes.INTEGER,
			financiador_nome: DataTypes.STRING,
			chefe: DataTypes.STRING,
			chefe_email: DataTypes.STRING,
			resumo: DataTypes.TEXT,
			objetivos: DataTypes.TEXT,
			justificativa: DataTypes.TEXT,
			relevancia: DataTypes.TEXT,
			file_id: DataTypes.INTEGER,
			createdAt: {
				type: DataTypes.DATE,
				field: 'created_at',
			},
			updatedAt: {
				type: DataTypes.DATE,
				field: 'updated_at',
			},
			updatedBy: {
				type: DataTypes.INTEGER,
				field: 'updated_by',
			},
		},
		{
			sequelize,
			tableName: 'projects',
			modelName: 'Project',
		}
	);
	return Project;
};
