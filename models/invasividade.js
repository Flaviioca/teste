const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class ProjectInvasividade extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			ProjectInvasividade.belongsTo(models.Project, {
				foreignKey: 'project_id',
				as: 'project',
			});
		}
	}
	ProjectInvasividade.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			project_id: DataTypes.INTEGER,
			resumo_do_procedimento : DataTypes.TEXT,
			invasividade: DataTypes.INTEGER,
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
			tableName: 'project_inasividade',
			modelName: 'ProjectInvasividade',
		}
	);
	return ProjectInvasividade;
};
