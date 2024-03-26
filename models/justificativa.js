const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class justificativa extends Model {
		static associate(models) {
			justificativa.belongsTo(models.Project, {
				foreignKey: 'projectId',
			});
			justificativa.belongsTo(models.User, {
				foreignKey: 'userId',
			});
		}
	}
	justificativa.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			projectId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			justificativa_texto: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			createdAt: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			},
			updatedAt: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			},
		},
		{
			sequelize,
			tableName: 'justificativa',
			modelName: 'justificativa',
		}
	);
	return justificativa;
};
